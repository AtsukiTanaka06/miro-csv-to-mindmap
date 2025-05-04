interface Node {
  nodeView: { content: string };
  children?: Node[];
}

interface InputJsonNode {
  name: string;
  children?: InputJsonNode[];
}

/**
 * 再帰的にJSONデータを Miro の Node 構造に変換する
 */
const convertJsonToMindmapNode = (json: InputJsonNode): Node => {
  return {
    nodeView: { content: json.name },
    children: json.children?.map(convertJsonToMindmapNode) || [],
  };
};

/**
 * JSONデータからマインドマップを作成
 */
export const createMindmapFromJson = async (jsonData: InputJsonNode) => {
  const rootNode = convertJsonToMindmapNode(jsonData);
  await miro.board.experimental.createMindmapNode(rootNode);
};
