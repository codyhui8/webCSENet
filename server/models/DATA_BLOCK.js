'use strict';

const Model = require('objection').Model;

class DATA_BLOCK extends Model {
    static get tableName() {
        return 'DATA_BLOCK'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['BLOCK_NAME_CD'],

            properties: {
                'BLOCK_NAME_CD': { type: 'string' },
                'DATA_BLOCK_ID': { type: 'integer' }
            }
        };
    }

    static get relationMappings() {
        
        const DATA_BLOCK_FIELDS = require('./DATA_BLOCK_FIELDS')

        return {
            'DATA_BLOCK_FIELDS': {
                relation: Model.HasManyRelation,
                modelClass: DATA_BLOCK_FIELDS,
                join: {
                    from: 'DATA_BLOCK.DATA_BLOCK_ID',
                    to: 'DATA_BLOCK_FIELDS.DATA_BLOCK_ID'
                }
            }
        };
    }
}

module.exports = DATA_BLOCK; 