package com.devops.commentsservice;

import com.devops.commentsservice.clientConfig.AttractionRestClient;
import com.devops.commentsservice.clientConfig.TouristRestClient;
import com.devops.commentsservice.models.Attraction;
import com.devops.commentsservice.models.Comments;
import com.devops.commentsservice.models.Tourist;
import com.devops.commentsservice.repository.CommentsRepository;
import com.devops.commentsservice.service.CommentService;
import com.devops.commentsservice.service.implementation.CommentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class CommentsServiceApplicationTests {
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @InjectMocks
    private CommentServiceImpl commentService;  // Modification ici

    @Mock
    private AttractionRestClient attractionRestClient;

    @Mock
    private TouristRestClient touristRestClient;

    @Mock
    private CommentsRepository commentsRepository;

    @Test
    public void testAddCommentsByAtrByIdTourist() {
        Long attractionId = 1L;
        Long touristId = 1L;
        Comments comments = new Comments();
        comments.setContent("Great place!");

        Attraction attraction = new Attraction();
        attraction.setId(attractionId);
        Tourist tourist = new Tourist();
        tourist.setId(touristId);

        when(attractionRestClient.findAttractionById(attractionId)).thenReturn(attraction);
        when(touristRestClient.getoneById(touristId)).thenReturn(tourist);
        when(commentsRepository.save(comments)).thenReturn(comments);

        Comments result = commentService.addCommentsByAtrByIdTourist(attractionId, touristId, comments);

        verify(attractionRestClient).findAttractionById(attractionId);
        verify(touristRestClient).getoneById(touristId);
        verify(commentsRepository).save(comments);

        assertNotNull(result);
        assertEquals(attractionId, result.getAttractionId());
        assertEquals(touristId, result.getTouristId());
        assertEquals("Great place!", result.getContent());
    }

    @Test
    public void testDeleteComment() {
        Long commentId = 1L; // ID du commentaire à supprimer

        // Configurer le mock pour simuler la suppression
        doNothing().when(commentsRepository).deleteById(commentId);

        // Appeler la méthode à tester
        commentService.deleteComment(commentId);

        // Vérifier que la méthode deleteById a été appelée avec le bon ID
        verify(commentsRepository).deleteById(commentId);

        // Assurer qu'aucune autre interaction indésirable n'a lieu
        verifyNoMoreInteractions(commentsRepository);
    }

    @Test
    public void testUpdateComment() {
        Long commentId = 1L; // ID du commentaire à modifier
        Comments originalComment = new Comments(); // Commentaire initial
        originalComment.setId(commentId);
        originalComment.setContent("Old content");

        Comments updatedComment = new Comments(); // Commentaire modifié
        updatedComment.setContent("Updated content");

        // Configurer le mock pour retourner le commentaire initial lors de la recherche par ID
        when(commentsRepository.findById(commentId)).thenReturn(Optional.of(originalComment));
        // Configurer le mock pour retourner le commentaire modifié lors de la sauvegarde
        when(commentsRepository.save(any(Comments.class))).thenReturn(updatedComment);

        // Appeler la méthode à tester
        Comments result = commentService.updateComment(commentId, updatedComment);

        // Vérifier que les méthodes findById et save ont été appelées sur le repository
        verify(commentsRepository).findById(commentId);
        verify(commentsRepository).save(updatedComment);

        // Vérifier que le résultat contient les modifications attendues
        assertEquals("Updated content", result.getContent());

        // Assurer qu'aucune autre interaction indésirable n'a lieu
        verifyNoMoreInteractions(commentsRepository);
    }


}
