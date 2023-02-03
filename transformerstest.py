from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS

"""
hyper-efficient without libraries:

Optimize the tokenization process: Instead of using a tokenization library, you can write your own tokenization function that is tailored to your specific use case. This can include removing unnecessary steps such as lowercasing or stemming the text.
Use a lightweight data structure: Instead of using a data structure like a list or a dictionary to store the tokenized text, you can use a lightweight data structure like a numpy array.
Optimize the model architecture: Instead of using a pre-trained model, you can train your own model with a more efficient architecture. This can include using a shallower or more sparse model, or reducing the number of parameters in the model.
Use a more efficient algorithm: Instead of using a general-purpose algorithm, you can use a more efficient algorithm that is specifically designed for your use case. For example, if you are comparing the similarity of two files, you can use a more efficient algorithm like the Jaccard index or the Sørensen-Dice coefficient
Use Cython or C++ implementation of your script: Cython is a programming language that is a superset of Python and can be compiled to C or C++.

"""







def outputFunc(text,tokenizer,model):
  
    encoded_input = tokenizer(text, return_tensors="pt")
    outputs = model(**encoded_input)
    print(outputs)
    outputs = model(**encoded_input)
    logits = outputs[0]
    probabilities = torch.nn.functional.softmax(logits, dim=1)
    #maybe replace this with numpy? torch is huge
    print(probabilities)


    return [probabilities[0][0].item(),probabilities[0][1].item()]

Wtokenizer = AutoTokenizer.from_pretrained("roberta-base-openai-detector")

Wmodel = AutoModelForSequenceClassification.from_pretrained("roberta-base-openai-detector")

#text = "The outputs of this model are the logits of the classification. Logits are the raw, un-normalized output values of a neural network before they are passed through a softmax function to produce probabilities. The model is trained to predict the class labels (e.g. 'positive' or 'egative') of the input text. In this case, it is not a percentage of how much the text is written by AI. It is a sequence classification model. You would have to apply a softmax function to the output logits to get the probability of each class and then pick the class with the highest probability as the predicted label. It is also important to note that even though the model is pre-trained on a large dataset, it is not specifically designed to determine if a text is written by AI or not."

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])

def predict():
    text = request.json['text']
    print('recieved.')
    result = outputFunc(text,tokenizer=Wtokenizer,model=Wmodel)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='localhost',port=3000)