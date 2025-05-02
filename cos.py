from typing import List, Tuple

def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    with open(filename, 'r') as file:
        lines = file.readlines()
    vertex_count = int(lines[0].strip())
    adjacency_list = [list(map(int, line.strip().split())) for line in lines[1:]]
    
    return adjacency_list, vertex_count

def write_neighbours_list(adjacency_list: List[List[int]]) -> None:
    for idx, neighbours in enumerate(adjacency_list):
        print(f"Sąsiadami wieżchołka {idx} są: {', '.join(map(str, neighbours))}")

def list_to_matrix(adjacency_list: List[List[int]]) -> List[List[int]]:
    vertex_count = len(adjacency_list)
    matrix = [[0 for _ in range(vertex_count)] for _ in range(vertex_count)]
    for i, neighbours in enumerate(adjacency_list):
        for j in neighbours:
            matrix[i][j] = 1

            
    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    for row in matrix:
        print(' '.join(map(str, row)))

def main():
    filename = 'graph.txt'
    adjacency_list, vertex_count = read_graph(filename)
    print("Lista sąsiedztwa:")
    write_neighbours_list(adjacency_list)
    matrix = list_to_matrix(adjacency_list)
    print("\nMacierz sąsiedztwa:")
    write_matrix(matrix)

if __name__ == '__main__':
    main()
