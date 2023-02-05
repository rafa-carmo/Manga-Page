from os import path
from datetime import datetime

class Log:
    def saveLog(self, msg: str) -> None:
        now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        if(not path.exists('log.txt')):
            with open('log.txt', 'w+') as log:
                log.write(f"{now} - {msg}\n")
                return
        with open('log.txt', 'a') as log:
            log.write(f"{now} - {msg}\n")
        