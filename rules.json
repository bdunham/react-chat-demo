{
  "rules": {
    "messages": {
      "$room_id": {
        ".read": "root.child('rooms').child($room_id).exists() === true",
        ".write": "root.child('rooms').child($room_id).exists() === true",
        ".indexOn": ["timestamp"]
      }
    },
    "rooms": {
      ".read": true,
      "$room_id": {
        ".write": "root.child('messages').child(newData.child('name').val()).exists() == false",
        ".indexOn": ["timestamp"]
      }
    }
  }
}