/*
 *  Wiki Monkey - MediaWiki bot and editor assistant that runs in the browser
 *  Copyright (C) 2011-2012 Dario Giovannetti <dev@dariogiovannetti.net>
 * 
 *  This file is part of Wiki Monkey.
 * 
 *  Wiki Monkey is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 * 
 *  Wiki Monkey is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 * 
 *  You should have received a copy of the GNU General Public License
 *  along with Wiki Monkey.  If not, see <http://www.gnu.org/licenses/>.
 */

WM.Parser = new function () {
    this.convertUnderscoresToSpaces = function (title) {
        return title.replace(/_/g, " ");
    };
    
    this.convertSpacesToUnderscores = function (title) {
        return title.replace(/ /g, "_");
    };
    
    this.neutralizeNowikiTags = function (source) {
        var tags = Alib.RegEx.matchAll(source, /<nowiki>[.\s]+?<\/nowiki>/gi);
        for (var t in tags) {
            var filler = "";
            while (filler.length < tags[t].length) {
                filler += "x";
            }
            source = source.substr(0, tags[t].index - 1) + filler + source.substr(tags[t].index + tags[t].length)
        }
        return source;
    };
    
    var prepareTitleCasing = function (pattern) {
        var firstChar = pattern.charAt(0);
        var fcUpper = firstChar.toUpperCase();
        var fcLower = firstChar.toLowerCase();
        if (fcUpper != fcLower) {
            pattern = "[" + fcUpper + fcLower + "]" + pattern.substr(1);
        }
        return pattern;
    };
    
    this.findBehaviorSwitches = function (source, word) {
        var res;
        if (word) {
            var regExp = new RegExp("__" + Alib.RegEx.escapePattern(word) + "__", "g");
            res = Alib.RegEx.matchAll(source, regExp);
        }
        else {
            res = Alib.RegEx.matchAll(source, /__(TOC|NOTOC|FORCETOC|NOEDITSECTION|NEWSECTIONLINK|NONEWSECTIONLINK|NOGALLERY|HIDDENCAT|NOCONTENTCONVERT|NOCC|NOTITLECONVERT|NOTC|INDEX|NOINDEX|STATICREDIRECT|START|END)__/g);
        }
        return res;
    };
    
    this.findVariables = function (source, variable) {
        var regExp = new RegExp("\\{\\{ *" + Alib.RegEx.escapePattern(variable) + " *\\}\\}", "g");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findVariableVariables = function (source, variable) {
        var regExp = new RegExp("\\{\\{ *" + Alib.RegEx.escapePattern(variable) + " *: *(.+?) *\\}\\}", "g");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findInternalLinks = function (source, namespace) {
        var res;
        if (namespace) {
            var nsPattern = Alib.RegEx.escapePattern(namespace);
            nsPattern = prepareTitleCasing(nsPattern);
            var regExp = new RegExp("\\[\\[ *((" + nsPattern + ") *: *(.+?)) *\\]\\]", "g");
            res = Alib.RegEx.matchAll(source, regExp);
        }
        else {
            res = Alib.RegEx.matchAll(source, /\[\[ *((?:(.+?) *: *)?(.+?)) *\]\]/g);
        }
        return res;
    };
    
    this.findCategories = function (source) {
        return this.findInternalLinks(source, "Category");
    };
    
    this.findInterwikiLinks = function (source, wiki) {
        return this.findInternalLinks(source, wiki);
    };
    
    this.findTemplateTags = function (source, template) {
        var templatePattern = Alib.RegEx.escapePattern(template);
        templatePattern = prepareTitleCasing(templatePattern);
        var regExp = new RegExp("\\{\\{ *" + templatePattern, "g");
        return Alib.RegEx.matchAll(source, regExp);
    };
    
    this.findTemplates = function (source, template) {
        var nSource = this.neutralizeNowikiTags(source);
        var templatePattern = Alib.RegEx.escapePattern(template);
        templatePattern = prepareTitleCasing(templatePattern);
        var regExp = new RegExp("(\\{\\{ *(" + templatePattern + ")\\s*\\|)(\\s*(?:.(?!\\{\\{)\\s*)*?)\\}\\}", "g");
        var templates = [];
        
        do {
            var res = Alib.RegEx.matchAll(nSource, regExp);
            
            for (var t in res) {
                var match = res[t].match;
                var index = res[t].index;
                var L = res[t].length;
                var args = match[3].split("|");
                var arguments = [];
                var argId = index + match[1].length;
                
                for (var a in args) {
                    var argL = args[a].length;
                    var eqId = args[a].indexOf("=");
                    // eqId must be > 0, not -1, in fact the key must not be empty
                    if (eqId > 0) {
                        var rawKey = args[a].substr(0, eqId);
                        var reKey = /(\s*)(.+?)\s*/;
                        var keyMatches = reKey.exec(rawKey);
                        var key = keyMatches[2];
                        var keyId = argId + ((keyMatches[1]) ? keyMatches[1].length : 0);
                        
                        var nValue = args[a].substr(eqId + 1);
                        var valueId = argId + keyMatches[0].length;
                        var valueL = argL - eqId - 1;
                    }
                    else {
                        var key = null;
                        var keyId = null;
                        var nValue = args[a];
                        var valueId = argId;
                        var valueL = argL;
                    }
                    
                    var value = source.substr(valueId, valueL);
                    
                    arguments.push({key: key,
                                    key_index: keyId,
                                    value: value,
                                    value_index: valueId});
                    
                    // 1 is the length of |
                    argId = argId + argL + 1;
                }
                
                templates.push({
                    name: match[2],
                    index: index,
                    length: L,
                    arguments: arguments,
                });
                
                var filler = "";
                while (filler.length < L) {
                    filler += "x";
                }
                nSource = nSource.substr(0, res[t].index - 1) + filler + nSource.substr(res[t].index + L)
            }
        // Find also nested templates
        } while (res.length);
        
        return templates;
    };
        
    this.findSectionHeadings = function (source) {
        // ======Title====== is the deepest level supported
        var MAXLEVEL = 6;
        
        var sections = [];
        var minLevel = MAXLEVEL;
        var maxTocLevel = 0;
        var tocLevel = 1;
        var regExp = /^(\=+ *.+? *\=+)[ \t]*$/gm;
        var match, line, L0, L1, level, prevLevels, start, end, tocPeer;
        
        while (true) {
            match = regExp.exec(source);
            
            if (match) {
                L0 = match[0].length;
                line = match[1];
                L1 = line.length;
                level = 1;
                start = "=";
                end = "=";
                
                // ==Title=== and ===Title== are both 2nd levels and so on
                // (the shortest sequence of = between the two sides is
                //  considered)
                
                // = and == are not titles
                // === is read as =(=)=, ==== is read as =(==)= (both 1st
                //                                               levels)
                // ===== is read as ==(=)== (2nd level) and so on
                
                while (true) {
                    start = line.substr(level, 1);
                    end = line.substr(L1 - level - 1, 1);
                    
                    if (L1 - level * 2 > 2 && start == "=" && end == "=") {
                        level++;
                    }
                    else {
                        if (level > MAXLEVEL) {
                            level = MAXLEVEL;
                        }
                        else if (level < minLevel) {
                            minLevel = level;
                        }
                        break;
                    }
                }
                
                if (level == minLevel) {
                    tocLevel = 1;
                    prevLevels = {};
                    prevLevels[level] = 1;
                    prevLevels.relMax = level;
                }
                else if (level > prevLevels.relMax) {
                    tocLevel++;
                    prevLevels[level] = tocLevel;
                    prevLevels.relMax = level;
                    if (tocLevel > maxTocLevel) {
                        maxTocLevel = tocLevel;
                    }
                }
                else if (level < prevLevels.relMax) {
                    if (prevLevels[level]) {
                        tocLevel = prevLevels[level];
                    }
                    else {
                        // tocPeer is the level immediately greater than the
                        // current one, and it should have the same tocLevel
                        // I must reset tocPeer here to the relative maximum
                        tocPeer = prevLevels.relMax;
                        for (var pLevel in prevLevels) {
                            if (pLevel > level && pLevel < tocPeer) {
                                tocPeer = pLevel;
                            }
                        }
                        tocLevel = prevLevels[tocPeer];
                        prevLevels[level] = tocLevel;
                    }
                    prevLevels.relMax = level;
                }
                
                sections.push({line: line,
                               level: level,
                               tocLevel: tocLevel,
                               index: (regExp.lastIndex - L0),
                               length0: L0,
                               length1: L1});
            }
            else {
                break;
            }
        }
        
        // Articles without sections
        if (maxTocLevel == 0) {
            minLevel = 0;
        }
        
        return {sections: sections,
                minLevel: minLevel,
                maxTocLevel: maxTocLevel};
    };
};
