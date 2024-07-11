import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './posts.module.scss';
import Post from '../../features/Post/Post';

const posts = [
    {
        id: "1",
        time: '4mo',
        author: {
            fullname: 'Md. Jayeen Bin Alam',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        content: `🎉 Exploring Stored Procedures in MySQL: Pros and Cons

Stored procedures are a powerful feature in MySQL that can streamline database operations and enhance application performance. In this post, we'll dive into the pros and cons of using stored procedures, along with a code snippet to demonstrate their implementation.

🌝 Pros of Stored Procedures:
1. Improved Performance:
Stored procedures can reduce network traffic by executing multiple SQL statements in a single round trip to the database server. This can significantly improve performance, especially for complex operations or batch processing tasks.
2. Enhanced Security:
Stored procedures can help enforce security policies by allowing database administrators to restrict direct access to tables and grant access only through the procedures. This adds an extra layer of security to the database.
3. Encapsulation of Business Logic:
By encapsulating SQL queries and business logic within stored procedures, developers can create reusable components that can be easily called from multiple parts of the application. This promotes code reusability and maintainability.

🌚 Cons of Stored Procedures:
1. Vendor Lock-in:
Stored procedures are specific to the database management system (DBMS) they are created in. If you decide to switch to a different DBMS in the future, you may need to rewrite your stored procedures, leading to vendor lock-in.
2. Limited Portability:
While SQL is a standard language, the syntax and features of stored procedures can vary between different database systems. This can make it challenging to migrate stored procedures from one DBMS to another without modification.
3. Debugging Complexity:
Debugging stored procedures can be more challenging compared to debugging application code. Errors in stored procedures may not always be straightforward to diagnose, especially in complex procedures with multiple SQL statements.`
    }
];

const Posts = () => {
    return (
        <Navbar>
            <div className={styles.posts_wrapper}>
                {
                    posts.map((post) => <Post post={post} key={post.id} />)
                }
            </div>
        </Navbar>
    );
}

export default Posts;
