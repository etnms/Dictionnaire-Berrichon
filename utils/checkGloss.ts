function checkGloss(value: string) {
    switch (value) {
        case "M":
            return " masculin";
        case "F":
            return " féminin";
        default:
            return "";
    }
}

export default checkGloss;