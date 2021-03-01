import random
def randoms():
    a = random.randint(1, 500)
    b = random.randint(1, 50)
    while a < b:
        a = random.randint(1, 500)
        b = random.randint(1, 50)
    return a, b


correct = 0
question = 0

while question < 20:
    question += 1
    print ("question Number: ", question)
    a, b = randoms()
    c = random.randint(1, 4)

    if c == 1:
        result = a+b
        answer = int(input(str(a)+" + "+str(b)+" = "))
        if result == answer:
            print("Correct")
            correct+=1
        else:
            print("Incorrect")
            print("The correct answer is ", result)


    elif c == 2:
        result = a-b
        answer = int(input(str(a)+" - "+str(b)+" = "))
        if result == answer:
            print("Correct")
            correct+=1
        else:
            print("Incorrect")
            print("The correct answer is ", result)
 

    elif c == 3:
        result = a*b
        answer = int(input(str(a)+" * "+str(b)+" = "))
        if result == answer:
            print("Correct")
            correct+=1
        else:
            print("Incorrect")
            print("The correct answer is ", result)


    elif c == 4:
        result = float(a/b)
        result = round(result, 2)
        answer = float(input(str(a)+" / "+str(b)+" = "))
        if result == answer:
            print("Correct")
            correct+=1
        else:
            print("Incorrect")
            print("The correct answer is ", round(result, 2))
    
    print ()
    
print("You've got", correct, "correct answers out of ", question)

print()