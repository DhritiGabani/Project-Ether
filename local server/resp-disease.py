import sys, json
import os
import math
import glob
import numpy as np
import tensorflow as tf
import librosa
from tensorflow import keras
from tensorflow.keras.models import load_model

data = json.loads(sys.argv[1])
os.chdir("../")

audioFile = ""

for dirpath, dirs, files in os.walk(os.getcwd()):  
  for filename in files:
    fname = os.path.join(dirpath,filename) 
    if filename == data["fileName"]:
        audioFile = fname

clip, sr = librosa.load(audioFile)
mfccs = librosa.feature.mfcc(y = clip, sr = sr, n_mfcc = 40)
if mfccs.shape[1] == 862:
    model = load_model(os.getcwd() + "/static/tfjs-models/Respiratory-disease-detection-model/respiratory-model.h5")
    mfccs = mfccs.reshape(1, 40, 862, 1)
    predictions = model.predict(mfccs)
    predictions =  [(round(pred * 100)) for pred in predictions[0]]
    print(predictions)
else:
    print("Cannot process audio file")