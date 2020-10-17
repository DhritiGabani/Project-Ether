import sys, json
import joblib
import numpy as np
import pandas as pd
import sklearn
from sklearn.ensemble import RandomForestClassifier
data = json.loads(sys.argv[1])

model = joblib.load("../static/tfjs-models/Heart-disease-detection-model/model.joblib")
X_test = np.array(list(data.values()))

df = pd.DataFrame(data = X_test).T
if '' not in X_test:
    prediction = model.predict(df)
    print(prediction[0])