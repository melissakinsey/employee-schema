// Require express.js and mySQL

const express = require("express");

const mysql = require("mysql");

// Use createConnection() method to join node.js to mySQL

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#MySQL555",
    database: "nodemysql"
})