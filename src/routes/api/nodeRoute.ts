import express, {Request, Response} from 'express';
import HttpError from '../../models/HttpError';
import { NodeTree } from '../../models/models';
import NodeService from '../../services/nodeService';
const router = express.Router();
const dbContext = require('../../store/dbContext');

interface NodeItem {
    node_id: number,
    name: string,
    children_count: number
}
interface NodeResponse {
    nodes: NodeItem[],
    error: string
}

router.get('/', async function(req: Request, res: Response) {
    const response: NodeResponse = {
        nodes: [],
        error: ''
    };
    try {
        // mandatory params
        if(!req.query.node_id || !req.query.language)
            throw new HttpError('Missing mandatory params', 400);

        const nodeId: number = +(req.query.node_id || 0);
        const language: string = req.query.language ? req.query.language + '' : 'italian';
        const searchKeyword: string = req.query.search_keyword ? req.query.search_keyword + '': '';
        const pageNum: number = req.query.page_num ? +req.query.page_num : 0;
        const pageSize: number = req.query.page_size ? +req.query.page_size : 100;
        
        const node: NodeTree = await NodeService.getNode(nodeId, language);
        if(!node)
            throw new HttpError('Invalid node id', 404);
        const nodes: NodeTree[] = await NodeService.getNodes(node, language, pageSize, pageNum*pageSize, searchKeyword);

        response.nodes = nodes.reduce((t: NodeItem[], n: NodeTree) => {
            t.push({
                node_id: n.idNode,
                name: n.nodeName,
                children_count: (((n.iRight- 1) - n.iLeft) / 2)
            } as NodeItem)
            return t;
        }, []);
    
    } catch(err) {
        response.error = err.message;
        res.statusCode = err.statusCode || 500 
    }
    res.send(response);    
});

export default router;