import { v4 as uuidv4 } from 'uuid';

function getTreeNodeId() {
  return uuidv4();
}

export default getTreeNodeId;