# User API

This is a simple Node.js + Express API that connects to a MongoDB database and retrieves user data by ID. It includes ObjectId validation, error handling, and only returns users whose age is greater than 21.

## How to Run

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with:
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
4. Run the server:
   node index.js
5. Output:
![image](https://github.com/user-attachments/assets/4cb25363-7fb8-4e75-af4e-5932bfe460f8)
