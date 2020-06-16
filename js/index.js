'use strict'

const socket = io()

// // Send a message to say that I've connected
// socket.emit('newuser', {user: 'Grace Hopper'})

// // Event listener, waiting for an incoming "newuser"
// socket.on('newuser', (data) => console.log(`${data.user} has connected!`))


// Listen for the 'submit' of a form
// 	 event.preventDefault()  (prevent the form from leaving the page)
//   Emit a message using "chatmsg"
// Listen for "chatmsg"
//   add a <li> with the chat msg to the <ol>

const $msgForm = document.getElementById('sendChatMsg')
const $msgList = document.getElementById('messages')
const $userName = document.getElementById('uName')
let profileName

$userName.addEventListener('submit',(event) =>{
	event.preventDefault()
	profileName = event.currentTarget.profileName.value
	socket.emit('newuser',{uname: event.currentTarget.profileName.value})
	//console.log(`${profileName} joined chatroom `)
})
// Event listener, waiting for an incoming "newuser"
socket.on('newuser', (data) => { console.log(`${data.uname} has connected!`) })



$msgForm.addEventListener('submit', (event) => {
	event.preventDefault()
	if(profileName)
	{
		socket.emit('chatmsg', {msg: event.currentTarget.txtmsg.value , user: profileName})	
	}

	else
	{
		socket.emit('chatmsg', {msg: event.currentTarget.txtmsg.value , user: "Guest"})	
	}
	
})


	socket.on('chatmsg', (data) => {

		console.log(`${data.user} : ${data.msg}`)
		const postMsg = document.createElement('p')
		$msgList.appendChild(postMsg)
		postMsg.style.color = "dimgrey"
		postMsg.textContent = `${data.user} : ${data.msg}`
	
	})