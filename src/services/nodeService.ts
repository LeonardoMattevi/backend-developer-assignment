import { NodeTree } from '../models/models';
import { db } from '../store/dbContext';

class NodeService {
    static async getNode(idNode: number, language: string) : Promise<NodeTree> {
        return new Promise(function(resolve, reject) { 
            db.all(`
                SELECT *
                FROM node_tree
                INNER JOIN node_tree_names
                ON node_tree.idNode = node_tree_names.idNode
                WHERE node_tree.idNode = ? AND node_tree_names.language = ?
            `, [idNode, language], function(err: Error, rows: NodeTree[]) {
                if(err){ return reject(err); }
                resolve(rows[0]);
            });
        });
    }
    static async getNodes(parentNode: NodeTree, language: string, limit: number = 100, offset: number = 0, searchKeyword: string = '') : Promise<NodeTree[]> {
        return new Promise(function(resolve, reject) {       
            const queryArguments = [language, parentNode.iLeft, parentNode.iRight];
            if(searchKeyword) {
                queryArguments.push('%' + searchKeyword + '%');
            }            
            queryArguments.push(limit);
            queryArguments.push(offset);

            db.all(`
                SELECT *
                FROM node_tree 
                INNER JOIN node_tree_names
                ON node_tree.idNode = node_tree_names.idNode
                WHERE node_tree_names.language = ? AND ? < node_tree.iLeft AND ? > node_tree.iRight 
                ${searchKeyword ? "AND node_tree_names.nodeName LIKE ?" : ''}
                ORDER BY node_tree.iLeft limit ? offset ?
            `, queryArguments, function(err: Error, rows: NodeTree[]) {
                if(err){ return reject(err); }
                resolve(rows);
            });
        });
    };
};

export default NodeService;