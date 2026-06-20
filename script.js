const form=document.getElementById("bookingForm");
form.addEventListener("submit",function(e){
e.preventDefault();
let data=new FormData();
data.append("name",document.getElementById("name").value);
data.append("age",document.getElementById("age").value);
data.append("phone",document.getElementById("phone").value);
data.append("flight",document.getElementById("flight").value);
data.append("seat",document.getElementById("seat").value);
fetch("add_booking.php",{method:"POST",body:data})
.then(response=>response.text())
.then(result=>{
alert(result);
loadBookings();
form.reset();
});
});
function loadBookings(){
fetch("fetch_bookings.php")
.then(response=>response.json())
.then(data=>{
let output="";
data.forEach(booking=>{
output+=`
<tr>
<td>${booking.booking_id}</td>
<td>${booking.passenger_name}</td>
<td>${booking.flight_name}</td>
<td>${booking.seat_no}</td>
<td>${booking.status}</td>
<td>
<button class="delete" onclick="deleteBooking(${booking.booking_id})">Delete</button>
</td>
</tr>`;
});
document.getElementById("bookingList").innerHTML=output;
});
}
function deleteBooking(id){
let data=new FormData();
data.append("id",id);
fetch("delete_booking.php",{method:"POST",body:data})
.then(response=>response.text())
.then(result=>{
alert(result);
loadBookings();
});
}
loadBookings();
