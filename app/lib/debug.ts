import debugg from 'debug';

export default function debug(namespace): { error: (errorMessage: string) => void } {
  return {
    error: error(namespace),
  };
}

function error(namespace): (errorMessage: string) => void {
  return (errorMessage: string) => {
    if (process.env.DEBUG_ERROR_TO_CONSOLE) {
      console.error(errorMessage);
    }

    debugg(namespace)(errorMessage);
  };
}
