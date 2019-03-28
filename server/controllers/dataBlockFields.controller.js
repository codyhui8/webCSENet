'use strict';

const { transaction } = require('objection');
const DATA_BLOCK_FIELDS = require('./../models/DATA_BLOCK_FIELDS');
const express = require('express');

module.exports = async function() {
    const value = await DATA_BLOCK_FIELDS.query()
        .eager('DATA_BLOCK')
        .orderBy('DATA_BLOCK_FIELDS_ID')
    return value;
}