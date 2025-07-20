import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentaireServiceService } from 'src/app/services/commentaire-service.service';
import { TouristServiceService } from 'src/app/services/tourist-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tourist',
  templateUrl: './tourist.component.html',
  styleUrls: ['./tourist.component.css']
})
export class TouristComponent implements OnInit {

  listProfile:any
  p:number=1;
  listComment:any
  commentsByIdTourist:any
  id:any


  constructor(private service_tourist:TouristServiceService,
              private service_comment:CommentaireServiceService,
              private activeRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllProfileTourist()
    this.getAllComments()
    this.getCommentByIdTourist()
  }

  getAllProfileTourist(){
    this.service_tourist.getAllTourist().subscribe((res:any)=>{
      this.listProfile=res
      console.log("liste des Profiles Tourist", this.listProfile);
      
    })
  }

  getAllComments(){
    this.service_comment.getAllComments().subscribe((res:any)=>{
      this.listComment=res
      console.log("liste des commentaires", this.listComment);
      
    })
  }

  getCommentByIdTourist(){
    this.service_comment.getCommentsById(this.id).subscribe((res:any)=>{
      this.commentsByIdTourist =res
      console.log("tourist comments ", this.commentsByIdTourist);
      
    })
  }
  deleteProfileTourist(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
    this.service_tourist.deleteTourist(id).subscribe((res:any)=>{
      console.log("Profile Deleted",res);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      //refresh list
      this.getAllProfileTourist()
    })
  }


})}}
