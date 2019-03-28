'use strict';

const Model = require('objection').Model;

class FAR_CODE_DATA_BLOCK extends Model {

    static get tableName() {
        return "FAR_CODE_DATA_BLOCK";
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['DATA_BLOCK_FIELDS_ID', 'FAR_CODE_ID'], 

            properties: {
                'FAR_CODE_DATA_BLOCK_ID': { type: 'integer' },
                'DATA_BLOCK_FIELDS_ID': { type: 'integer' },
                'VALUE_TXT': { type: 'string', maxLength: 1000 },
                'FAR_CODE_ID': { type: 'integer' }
            }
        };
    }

    static get relationMappings() {

        const FAR_CODE = require('./FAR_CODE');
        const DATA_BLOCK_FIELDS = require('./DATA_BLOCK_FIELDS');

        return {
            'FAR_CODE': {
                relation: Model.BelongsToOneRelation,
                modelClass: FAR_CODE,
                join: {
                    from: 'FAR_CODE_DATA_BLOCK.FAR_CODE_ID',
                    to: 'FAR_CODE.FAR_CODE_ID'
                }
            },

            'DATA_BLOCK_FIELDS': {
                relation: Model.BelongsToOneRelation,
                modelClass: DATA_BLOCK_FIELDS,
                join: {
                    from: 'FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS_ID',
                    to: 'DATA_BLOCK_FIELDS.DATA_BLOCK_FIELDS_ID'
                }
            }
        };
    }
}

module.exports = FAR_CODE_DATA_BLOCK