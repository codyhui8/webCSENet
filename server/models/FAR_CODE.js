'use strict';

const Model = require('objection').Model;

class FAR_CODE extends Model {
    static get tableName() {
        return 'FAR_CODE'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['FAR_CODE_CD', 'ACTION_CD', 'FUNCTION_CD', 'ACTION_REASON_CD', 'FAR_CODE_DESCRIPTION_TXT'],

            properties: {
                'FAR_CODE_CD': { type: 'string', minLength: 9, maxLength: 9},
                'ACTION_CD': { type: 'string',  minLength: 1, maxLength: 1 },
                'FUNCTION_CD': { type: 'string',  minLength: 3, maxLength: 3 },
                'ACTION_REASON_CD': { type: 'string',  minLength: 5, maxLength: 5 },
                'FAR_CODE_ID': { type: 'integer'},
                'FAR_CODE_DESCRIPTION_TXT': { type: 'string', maxLength: 1000 },
            }
        }; 
    }

    static get relationMappings() {

        const FAR_CODE_DATA_BLOCK = require('./FAR_CODE_DATA_BLOCK');
        const DATA_BLOCK_FIELDS = require('./DATA_BLOCK_FIELDS');

        return {
            'DATA_BLOCK_FIELDS': {
                relation: Model.ManyToManyRelation,
                modelClass: DATA_BLOCK_FIELDS,
                join: {
                    from: 'FAR_CODE.FAR_CODE_ID',
                    through: {
                        from: 'FAR_CODE_DATA_BLOCK.FAR_CODE_ID',
                        to: 'FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS_ID'
                    },
                    to: 'DATA_BLOCK_FIELDS.DATA_BLOCK_FIELDS_ID'
                }
            },

            'FAR_CODE_DATA_BLOCK': {
                relation: Model.HasManyRelation,
                modelClass: FAR_CODE_DATA_BLOCK,
                join: {
                    from: 'FAR_CODE.FAR_CODE_ID',
                    to: 'FAR_CODE_DATA_BLOCK.FAR_CODE_ID'
                }
            }
        }; 
    }
}

module.exports = FAR_CODE