function UF_multipleLineBreaks() {
    var s = readSource();
    
    s = s.replace(/[\n]{3,}/g, '\n\n');
    
    writeSource(s);
}
