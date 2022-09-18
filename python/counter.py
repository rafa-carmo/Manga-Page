from math import floor
from time import sleep

def counter(initial_seconds):
    secondsAmount = initial_seconds
    while True:
        minutes = floor(secondsAmount / 60)
        seconds = secondsAmount % 60

        print(f"{str(minutes).zfill(2)}:{str(seconds).zfill(2)}", end="\r")
        secondsAmount -= 1
        sleep(1)
        if(secondsAmount <= 0):
            break
counter(5)