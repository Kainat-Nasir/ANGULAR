import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  data: any;
  selectedproduct:any;


  selectedUserId: any = "All"
  selectedCompletedId: any = "All";


  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Replace with your API URL
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        this.data = data;
        console.log(this.data);
        this.selectedproduct = this.data;
   

        this.NonRepeatedValue(data)
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  user_id: any = [];
 

  NonRepeatedValue(data: any): void {
   data.forEach((item: any) => {
    if(! this.user_id.includes(item.userId)){
      this.user_id.push(item.userId)
      let DropDown = item.userId;
      // console.log(DropDown);      
    }
   });

  }


  DisplaySelectedValue(event: any, functionName: any): void {

    if(functionName == "UserID"){
      this.selectedUserId = event.target.value;
    }
    else if(functionName == "Completed"){
      this.selectedCompletedId = event.target.value;
    }

    this.displayAll();
  }

  displayAll(): void{

    this.selectedproduct = this.data;
  
    if(this.selectedUserId != "All"){
      this.selectedproduct = this.selectedproduct.filter((product:any)=>(product.userId == this.selectedUserId));
    }

    if(this.selectedCompletedId != "All"){
      this.selectedproduct = this.selectedproduct.filter((product:any)=>(product.completed == this.selectedCompletedId));
    }

}

}

