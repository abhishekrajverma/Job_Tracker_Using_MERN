const express = require('express');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
};