interface CoinFlipValidationResult {
  error: string | null;
  parsedArguments?: CoinFlipParsedArguments;
}

interface CoinFlipParsedArguments {
  betTotal: number;
  betSubject: number;
}
