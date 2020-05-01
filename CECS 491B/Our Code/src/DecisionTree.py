import tensorflow as tf
import keras
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import seaborn as sns
import sys


def function(weight, height):
    data = pd.read_csv("PUSData.csv")

    data["Label"] = pd.factorize(data["Label"])[0]

    X = data[["Weight", "Height"]]
    y = data[["Label"]]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1, random_state = 100)

    #user will be testing set
    newUser = {'Weight':[weight],'Height':[height]}
    df = pd.DataFrame(newUser, columns = ['Weight', 'Height'])

    classifier = DecisionTreeClassifier(criterion = "gini", random_state = 100, max_depth = 20, min_samples_leaf = 1)
    classifier.fit(X_train, y_train)

    y_pred = classifier.predict(df)
    print(y_pred)
    #return y_pred

if __name__ == "__main__":
    function(sys.argv[1],sys.argv[2])