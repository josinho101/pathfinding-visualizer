class UtilityHelper {
  /**
   * generate random numbers between min and max values
   * @param min min value
   * @param max max value
   */
  public static getRamdonNumber(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  /**
   * sleep for the specified amount of time
   */
  public static sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  /**
   * generate random number array
   * @param length length of array
   * @param min min value
   * @param max max value
   */
  public static generateRandomArray(
    length: number,
    min: number,
    max: number
  ): number[] {
    return Array.from(
      {
        length: length,
      },
      () => UtilityHelper.getRamdonNumber(min, max)
    );
  }
}

export default UtilityHelper;
