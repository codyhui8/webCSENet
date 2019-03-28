'use strict';

const Model = require('objection').Model;

class DATA_BLOCK_FIELDS extends Model {

    static get tableName() {
        return 'DATA_BLOCK_FIELDS'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['FIELD_NAME_CD', 'LOCATION_START', 'LOCATION_END', 'LENGTH', 'ALPHA_NUMERIC', 'COMMENT_TXT', 'REQUIRED_CD'],

            properties: {
                'DATA_BLOCK_ID': { type: 'integer'},
                'DATA_BLOCK_FIELDS_ID': { type: 'integer'},
                'FIELD_NAME_CD': { type: 'string'},
                'LOCATION_START': { type: 'integer' },
                'LOCATION_END': { type: 'integer' },
                'LENGTH': { type: 'integer' },
                'ALPHA_NUMERIC_CD': { type: 'string' },
                'COMMENT_TXT': { type: 'string' },
                'REQUIRED_CD': { type: 'boolean' },
            }
        }
    }

    static get relationMappings() {

        const DATA_BLOCK = require('./DATA_BLOCK')
        const FAR_CODE_DATA_BLOCK = require('./FAR_CODE_DATA_BLOCK')

        return {
            'DATA_BLOCK': {
                relation: Model.BelongsToOneRelation,
                modelClass: DATA_BLOCK,
                join: {
                    from: 'DATA_BLOCK_FIELDS.DATA_BLOCK_ID',
                    to: 'DATA_BLOCK.DATA_BLOCK_ID'
                }
            },

            'FAR_CODE_DATA_BLOCK': {
                relation: Model.HasManyRelation,
                modelClass: FAR_CODE_DATA_BLOCK,
                join: {
                    from: 'DATA_BLOCK_FIELDS.DATA_BLOCK_FIELDS_ID',
                    to: 'FAR_CODE_DATA_BLOCK.DATA_BLOCK_FIELDS_ID'
                }
            }
        }
    }
}

module.exports = DATA_BLOCK_FIELDS