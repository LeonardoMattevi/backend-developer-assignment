CREATE TABLE IF NOT EXISTS node_tree (idNode INTEGER PRIMARY KEY, level INTEGER, iLeft INTEGER, iRight INTEGER);
CREATE TABLE IF NOT EXISTS node_tree_names 
(
    idNode INTEGER, language TEXT, nodeName TEXT, UNIQUE(idNode, language),
    CONSTRAINT fk_idNode
    FOREIGN KEY (idNode)
    REFERENCES node_tree (idNode)
)