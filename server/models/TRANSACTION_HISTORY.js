'use strict';

const Model = require('objection').Model;

class TRANSACTION_HISTORY extends Model {
    static get tableName() {
        return 'TRANSACTION_HISTORY'
    }

    static get idColumn() {
        return 'TRANS_HIST_ID';
      }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['TRANS_TXT'],

            properties: {
                'TRANS_HIST_ID': { type: 'integer'},
                'TRANS_TXT': { type: 'string', maxLength: 10000 },
                'TRANS_TS': { type: 'string', format: 'date-time' },
                'TRANS_BLOB': { type: 'string' },
            }
        }; 
    }
}

module.exports = TRANSACTION_HISTORY