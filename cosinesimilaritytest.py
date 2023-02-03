import numpy as np
from sklearn.feature_extraction.text import CountVectorizer

#dot product of A, B divided by the magnitude of A times the magnitude of B = similarity

document = ["My name is Donald Trump. I am the 45th president of the United States of America.",
            "Donald Trump is my name, I am the president of the United States."]

vectorizer = CountVectorizer()

vectorizer.fit(document)

print('vocab:', vectorizer.vocabulary_)

vector = vectorizer.transform(document)

vectorarray = vector.toarray()

print(vectorarray)

dotproduct = np.dot(vectorarray[0], vectorarray[1])

x = 0
for num in vectorarray[0]:
  numsquared = num * num
  x += numsquared
maga = x**(1 / 2)

y = 0
for num in vectorarray[1]:
  numsum = num * num
  y += numsum

magb = y**(1 / 2)

similarity = dotproduct / (maga * magb)

print(similarity)
