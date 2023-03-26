const firebaseConfig = {
    apiKey: "AIzaSyDmZ-V5uEvdp1H9zTnferjjj_a_jjyy_WE",
    authDomain: "chatapp-4e7c5.firebaseapp.com",
    projectId: "chatapp-4e7c5",
    storageBucket: "chatapp-4e7c5.appspot.com",
    messagingSenderId: "324912198408",
    appId: "1:324912198408:web:cad7ee686ec202faa22e09"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Get the user's name and set it in the chat header
  let userName = prompt("Enter your name:");
  document.getElementById("user-name").innerText = `Logged in as ${userName}`;
  
  // Get references to the chat input elements
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  
  // Function to send a message to the chat
  function sendMessage() {
    const message = messageInput.value;
    if (message.trim() === "") {
      return;
    }
  
    // Construct the message object
    const messageObj = {
      sender: userName,
      content: message
    };
  
    // Push the message object to the database
    database.ref("messages").push(messageObj);
  
    // Clear the message input field
    messageInput.value = "";
  }
  
  // Add event listener for the send button
  sendButton.addEventListener("click", sendMessage);
  
  // Add event listener for the enter key on the message input field
  messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
  
  // Function to display a message in the chat
  function displayMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
  
    const senderElement = document.createElement("div");
    senderElement.innerText = message.sender;
    senderElement.classList.add("message-sender");
    messageContainer.appendChild(senderElement);
  
    const contentElement = document.createElement("div");
    contentElement.innerText = message.content;
    messageContainer.appendChild(contentElement);
  
    document.getElementById("chat-messages").appendChild(messageContainer);
  }
  
  // Listen for new messages added to the database
  database.ref("messages").on("child_added", function(data) {
    const message = data.val();
    displayMessage(message);
  });
  