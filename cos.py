def z1(words):
    result = []
    for i in range(39, len(words), 40):
        word = words[i]
        if len(word) >= 10:
            result.append(word[9])
    return ''.join(result)

def z2(words):
    max_unique = 0
    best_word = ""
    for word in words:
        unique_chars = len(set(word))
        if unique_chars > max_unique:
            max_unique = unique_chars
            best_word = word
    return f"{best_word} {max_unique}"

def z3(words, max_distance=10):
    valid_words = []
    for word in words:
        valid = True
        for i in range(len(word)):
            for j in range(i + 1, len(word)):
                if abs(ord(word[i]) - ord(word[j])) > max_distance:
                    valid = False
                    break
            if not valid:
                break
        if valid:
            valid_words.append(word)
    return valid_words

def main():
    with open('sygnaly.txt', 'r') as file:
        words = [line.strip() for line in file]

    with open('cos.txt', 'w') as output_file:
        output_file.write("z1\n")
        output_file.write(z1(words) + "\n\n")
        
        output_file.write("z2\n")
        output_file.write(z2(words) + "\n\n")
        
        output_file.write("z3\n")
        for word in z3(words):
            output_file.write(word + "\n")

if __name__ == "__main__":
    main()
