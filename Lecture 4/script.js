let input = '';
    let operation = null;
    let firstVal = '';
    let lastVal = '';
    let history = [];

    render();

    function reset() {
      operation = null;
      firstVal = input;
      lastVal = '';
    }

    function clear() {
      input = '';
      operation = null;
      firstVal = '';
      lastVal = '';
      history.push('CLEAR');
      render();
    }

    function initHandlers() {
      document
        .querySelector('.numbers-block')
        .addEventListener(
          'click',
          event =>
            'value' in event.target && handleNumberBtnClick(event.target.value),
        );

      document
        .querySelector('.left-operators-block')
        .addEventListener(
          'click',
          event =>
            'value' in event.target &&
            handleOperationBtnClick(event.target.value),
        );

      document
        .querySelector('.btn-clear')
        .addEventListener('click', () => clear());
    }

    function handleNumberBtnClick(number) {
      input += number;
      if (operation) {
        lastVal += number;
      } else {
        firstVal += number;
      }
      if (lastVal && operation) {
        executeResult();
      }
      render();
    }

    function handleOperationBtnClick(oper) {
      operation = oper;

      switch (oper) {
        case 'PLUS': {
          input += '+';
          break;
        }

        case 'MINUS': {
          input += '-';
          break;
        }

        case 'DIVIDE': {
          input += '/';
          break;
        }

        case 'MULTIPLY': {
          input += '*';
          break;
        }

        case 'SQRT': {
          executeResult();
          break;
        }

        case 'LN': {
          executeResult();
          break;
        }

        default: {
          throw new Error('Unknown operation');
        }
      }
      render();
    }

    function getExecuteResult() {
      switch (operation) {
        case 'PLUS': {
          return Number.parseInt(firstVal) + Number.parseInt(lastVal);
        }

        case 'MINUS': {
          return Number.parseInt(firstVal) - Number.parseInt(lastVal);
        }

        case 'DIVIDE': {
          return Number.parseInt(firstVal) / Number.parseInt(lastVal);
        }

        case 'MULTIPLY': {
          return Number.parseInt(firstVal) * Number.parseInt(lastVal);
        }

        case 'SQRT': {
          return Math.sqrt(firstVal);
        }

        case 'LN': {
          return Math.log(firstVal);
        }

        default: {
          throw new Error(`Unknown operation:${operation}`);
        }
      }
    }

    function executeResult() {
      const result = (input = getExecuteResult());
      history.push(`${firstVal} ${operation} ${lastVal} = ${result}`);
      reset();
      render();
    }

    function render() {
      document.getElementById('input').value = input;

      if (firstVal) {
        Array.from(document.querySelectorAll('.left-operators-block .btn')).map(
          el => el.removeAttribute('disabled'),
        );
      } else {
        !input &&
          Array.from(
            document.querySelectorAll('.left-operators-block .btn'),
          ).map(el => el.setAttribute('disabled', true));
      }

      const historyNode = document.getElementsByClassName('history')[0];
      historyNode.innerHTML = '';
      history.forEach(histEvent => {
        const newBlock = document.createElement('div');
        newBlock.innerHTML = histEvent;
        historyNode.appendChild(newBlock);
      });
    }

    initHandlers();
