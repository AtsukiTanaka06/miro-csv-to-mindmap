interface Node {
  nodeView: { content: string };
  children: Node[];
}

interface InputJsonNode {
  name: string;
  children?: InputJsonNode[];
}

/**
 * JSONからCSVと同じNode構造を作成
 * visitedの概念を保ちながら、再帰的に構築する
 */
const createGraphFromJson = (json: InputJsonNode): Node => {
  const visited: Record<string, Node> = {};

  const walk = (node: InputJsonNode, path: string[] = []): Node => {
    const key = [...path, node.name].join(" > ");

    if (!visited[key]) {
      const newNode: Node = {
        nodeView: { content: node.name },
        children: [],
      };
      visited[key] = newNode;

      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          const childNode = walk(child, [...path, node.name]);
          newNode.children.push(childNode);
        }
      }
    }

    return visited[key];
  };

  return walk(json);
};