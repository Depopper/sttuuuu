String.prototype.capitalize = function() {
    str = this
    str = str.replace(/^[a-z]/, this[0].toUpperCase())
    return (str)
}