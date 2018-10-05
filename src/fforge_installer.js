FiveForge.registerHTMLUI("installer","installer",function(handle, obj,app,scope) {
    handle.find("#backup").click(function(){
        let world = game.config.data.name;
        let a = document.createElement("a");
        a.href = 'http://localhost:30000/core/worlds/'+world;
        a.download = 'backup_'+world;
        a.click();
    })
    handle.find("#install").click(function(){
        game.templates = _baseTemplate
        let ents = game.entities.data;
        var tempDiv = $("<div>");
        for(let i in ents)
        {
            let entData = ents[i].data;
            console.log("Updating "+entData.info.name.current)
            if(entData._t == "c")
            {
                if(!entData._type)
                {
                    entData._type = "Character";
                }
                ents[i].sync("updateAsset");

            }
        }
        runCommand("updateTemplate", duplicate(game.templates));

        setTimeout(function(){
            location.reload();
        },1)
    })
})
let update_popup = undefined;
FiveForge.addHook("Initialize",function()
{
    game.locals["fforge_installer"] = game.locals["fforge_installer"] || sync.obj("fforge_installer");

    let obj = game.locals["fforge_installer"]
    obj.currentTemplateVersion = (game.templates.FiveForge || {}).VERSION;
    obj.latestTemplateVersion = _baseTemplate.FiveForge.VERSION;
    obj.modVersion = FiveForge.VERSION;

    var newApp = FiveForge.renderUI("installer",obj, null, {});

    var pop;
    pop = ui_popOut({
        target : $("body"),
        align : "center",
        id : "edit-item",
        maximize : true,
        minimize : true,
        close: function(){ pop.hide(); return false; },
        title: "FiveForge Installer",
        style : {"width" : "700px", "height" : "250px"}
      }, newApp);
    obj.popout = pop;
    obj.update();
    pop.resizable();

    if(obj.currentTemplateVersion != obj.latestTemplateVersion)
    {
        pop.show();
    }
    else
    {
        pop.hide();
    }
    update_popup = pop;

})
FiveForge.registerGlobalAction("Show Installer",function(){
    update_popup.show();
});


/**
    Template Base

**/

var _baseTemplate = {
    "info": {
        "name": {
            "current": "Worldbuilder"
        },
        "img": {
            "current": "/content/games/worldbuild.png"
        },
        "notes": {
            "name": "Notes"
        }
    },
    "identifier": "FiveForge",
    "build": "v2",
    "version": 1,
    "initiative": {
        "compare": "(@i1.i>@i2.i)?(1):(@i1.i==@i2.i?(0):(-1))"
    },
    "actors": {
    },
    "elements": {
        "Item": {
            "_t": "i",
            "_type": "Item",
            "info": {
                "name": {
                    "name": "Name",
                    "current": "Default Item"
                },
                "img": {
                    "name": "Item Art"
                },
                "notes": {
                    "name": "Item Notes"
                }
            },
            "_a": {}
        },
        "Spell": {
            "_t": "i",
            "_type": "Spell",
            "info": {
                "name": {
                    "name": "Name",
                    "current": "Default Spell"
                },
                "img": {
                    "name": "Spell Art"
                },
                "notes": {
                    "name": "Spell Notes"
                }
            },
            "_a": {}
        },
        "Trait": {
            "_t": "i",
            "_type": "Trait",
            "info": {
                "name": {
                    "name": "Name",
                    "current": "Default Trait"
                },
                "img": {
                    "name": "Trait Art"
                },
                "notes": {
                    "name": "Trait Notes"
                }
            },
            "_a": {}
        }
    },
    "page": {
        "_t": "p",
        "info": {
            "name": {
                "name": "Name",
                "current": "Default Page"
            },
            "img": {
                "name": "Art"
            },
            "notes": {
                "name": "Notes"
            },
            "mode": {
                "name": "Mode"
            }
        }
    },
    "security": {
        "player": {
            "Game Master": 1,
            "Assistant Master": 2,
            "Trusted Player": 3,
            "Player": 4,
            "Spectator": 5
        },
        "object": {
            "Default Access": 0,
            "Owner": 1,
            "Rights": 2,
            "Visible": 3,
            "Deny": 4
        }
    },
    "constants": {},
    "tables": {},
    "tags": {},
    "actions": {
        "c": {},
        "i": {}
    },
    "effects": {},
    "display": {
        "actors": {
            "Character": {
                "content": "<ui name='fforge_characterSheet' />"
            },
            "Monster": {
                "content": "<ui name='fforge_monsterSheet' />"
            },
        },
        "elements": {
            "Item": {
                "content": "Huh? How did you get there? Leave it alone!"
            },
            "Spell": {
                "content": "Huh? How did you get there?  Leave it alone!"
            },
            "Trait": {
                "content": "Huh? How did you get there?  Leave it alone!"
            }
        },
        "ui": {
            "ui_poolResults": {
                "classes": "flexrow flexaround",
                "dice": {
                    "width": "30px",
                    "height": "30px"
                },
                "results": {
                    "style": {
                        "width": "50%",
                        "background-color": "grey"
                    },
                    "display": {
                        "classes": "flexrow flexaround flex",
                        "display": [
                            {
                                "classes": "flexmiddle",
                                "cond": "(@pool.s-@pool.f)>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/success.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+(@pool.s-@pool.f)"
                                    }
                                ]
                            },
                            {
                                "classes": "flexmiddle",
                                "cond": "(@pool.f-@pool.s)>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/failure.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+(@pool.f-@pool.s)"
                                    }
                                ]
                            },
                            {
                                "classes": "flexmiddle",
                                "cond": "(@pool.a-@pool.t)>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/advantage.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+(@pool.a-@pool.t)"
                                    }
                                ]
                            },
                            {
                                "classes": "flexmiddle",
                                "cond": "(@pool.t-@pool.a)>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/threat.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+(@pool.t-@pool.a)"
                                    }
                                ]
                            },
                            {
                                "classes": "flexmiddle",
                                "cond": "@pool.tri>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/triumph.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+@pool.tri"
                                    }
                                ]
                            },
                            {
                                "classes": "flexmiddle",
                                "cond": "@pool.des>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/despair.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+@pool.des"
                                    }
                                ]
                            },
                            {
                                "classes": "flexmiddle",
                                "cond": "(@pool.light-@pool.dark)>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/lightside.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+(@pool.light-@pool.dark)"
                                    }
                                ]
                            },
                            {
                                "classes": "flexmiddle",
                                "cond": "(@pool.dark-@pool.light)>0",
                                "ui": "ui_icon",
                                "scope": {
                                    "image": "/content/dice/darkside.png"
                                },
                                "display": [
                                    {
                                        "style": {
                                            "font-weight": "bold"
                                        },
                                        "value": "'x'+(@pool.dark-@pool.light)"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "display": {
                    "classes": "outline lrpadding flexrow flexmiddle flexwrap flex"
                }
            }
        }
    },
    "grid": {},
    "dice": {
        "defaults": [
            "d20",
            "d12",
            "d10",
            "d8",
            "d6",
            "d4"
        ],
        "modifiers": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
        ],
        "keys": {
            "a": {
                "name": "Advantage",
                "img": "/content/dice/advantage.png"
            },
            "f": {
                "name": "Failure",
                "img": "/content/dice/failure.png"
            },
            "s": {
                "name": "Success",
                "img": "/content/dice/success.png"
            },
            "t": {
                "name": "Threat",
                "img": "/content/dice/threat.png"
            },
            "tri": {
                "name": "Triumph",
                "img": "/content/dice/triumph.png"
            },
            "des": {
                "name": "Despair",
                "img": "/content/dice/despair.png"
            },
            "light": {
                "name": "Light",
                "img": "/content/dice/lightside.png"
            },
            "dark": {
                "name": "Dark",
                "img": "/content/dice/darkside.png"
            },
            "minus": {
                "name": "Minus",
                "img": "/content/dice/minus.png"
            },
            "plus": {
                "name": "Plus",
                "img": "/content/dice/plus.png"
            }
        },
        "pool": {
            "d2": {
                "value": "d2"
            },
            "d4": {
                "value": "d4"
            },
            "d5": {
                "value": "d5"
            },
            "d6": {
                "value": "d6"
            },
            "d8": {
                "value": "d8"
            },
            "d10": {
                "value": "d10"
            },
            "d12": {
                "value": "d12"
            },
            "d20": {
                "value": "d20"
            },
            "d100": {
                "value": "d100"
            },
            "proficiency": {
                "static": true,
                "value": "d12",
                "display": {
                    "background-color": "rgb(255,230,0)",
                    "border": "1px solid black",
                    "color": "black"
                },
                "results": {
                    "1": {
                        "a": 2
                    },
                    "2": {
                        "a": 1
                    },
                    "3": {
                        "a": 2
                    },
                    "4": {
                        "tri": 1,
                        "s": 1
                    },
                    "5": {
                        "s": 1
                    },
                    "6": {
                        "s": 1,
                        "a": 1
                    },
                    "7": {
                        "s": 1
                    },
                    "8": {
                        "s": 1,
                        "a": 1
                    },
                    "9": {
                        "s": 2
                    },
                    "10": {
                        "s": 1,
                        "a": 1
                    },
                    "11": {
                        "s": 2
                    }
                },
                "translations": {
                    "1": {
                        "imgs": [
                            "/content/dice/advantage.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "2": {
                        "imgs": [
                            "/content/dice/advantage.png"
                        ]
                    },
                    "3": {
                        "imgs": [
                            "/content/dice/advantage.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "4": {
                        "imgs": [
                            "/content/dice/triumph.png"
                        ]
                    },
                    "5": {
                        "imgs": [
                            "/content/dice/success.png"
                        ]
                    },
                    "6": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "7": {
                        "imgs": [
                            "/content/dice/success.png"
                        ]
                    },
                    "8": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "9": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/success.png"
                        ]
                    },
                    "10": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "11": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/success.png"
                        ]
                    },
                    "12": {
                        "imgs": []
                    }
                }
            },
            "ability": {
                "static": true,
                "value": "d8",
                "display": {
                    "background-color": "rgb(80,185,75)",
                    "border": "1px solid black"
                },
                "results": {
                    "1": {
                        "s": 1
                    },
                    "2": {
                        "a": 1
                    },
                    "3": {
                        "s": 1,
                        "a": 1
                    },
                    "4": {
                        "s": 2
                    },
                    "5": {
                        "a": 1
                    },
                    "6": {
                        "s": 1
                    },
                    "7": {
                        "a": 2
                    }
                },
                "translations": {
                    "1": {
                        "imgs": [
                            "/content/dice/success.png"
                        ]
                    },
                    "2": {
                        "imgs": [
                            "/content/dice/advantage.png"
                        ]
                    },
                    "3": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "4": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/success.png"
                        ]
                    },
                    "5": {
                        "imgs": [
                            "/content/dice/advantage.png"
                        ]
                    },
                    "6": {
                        "imgs": [
                            "/content/dice/success.png"
                        ]
                    },
                    "7": {
                        "imgs": [
                            "/content/dice/advantage.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "8": {}
                }
            },
            "boost": {
                "static": true,
                "value": "d6",
                "display": {
                    "background-color": "rgb(135,215,245)",
                    "border": "1px solid black"
                },
                "results": {
                    "1": {
                        "s": 1,
                        "a": 1
                    },
                    "2": {
                        "a": 1
                    },
                    "3": {
                        "a": 2
                    },
                    "4": {
                        "s": 1
                    }
                },
                "translations": {
                    "1": {
                        "imgs": [
                            "/content/dice/success.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "2": {
                        "imgs": [
                            "/content/dice/advantage.png"
                        ]
                    },
                    "3": {
                        "imgs": [
                            "/content/dice/advantage.png",
                            "/content/dice/advantage.png"
                        ]
                    },
                    "4": {
                        "imgs": [
                            "/content/dice/success.png"
                        ]
                    },
                    "5": {},
                    "6": {}
                }
            },
            "challenge": {
                "static": true,
                "value": "d12",
                "display": {
                    "background-color": "rgb(230,25,55)",
                    "border": "1px solid black"
                },
                "results": {
                    "1": {
                        "t": 2
                    },
                    "2": {
                        "t": 1
                    },
                    "3": {
                        "t": 2
                    },
                    "4": {
                        "t": 1
                    },
                    "5": {
                        "f": 1,
                        "t": 1
                    },
                    "6": {
                        "f": 1
                    },
                    "7": {
                        "f": 1,
                        "t": 1
                    },
                    "8": {
                        "f": 1
                    },
                    "9": {
                        "des": 1,
                        "f": 1
                    },
                    "10": {
                        "f": 2
                    },
                    "11": {
                        "f": 2
                    }
                },
                "translations": {
                    "1": {
                        "imgs": [
                            "/content/dice/threat.png",
                            "/content/dice/threat.png"
                        ]
                    },
                    "2": {
                        "imgs": [
                            "/content/dice/threat.png"
                        ]
                    },
                    "3": {
                        "imgs": [
                            "/content/dice/threat.png",
                            "/content/dice/threat.png"
                        ]
                    },
                    "4": {
                        "imgs": [
                            "/content/dice/threat.png"
                        ]
                    },
                    "5": {
                        "imgs": [
                            "/content/dice/failure.png",
                            "/content/dice/threat.png"
                        ]
                    },
                    "6": {
                        "imgs": [
                            "/content/dice/failure.png"
                        ]
                    },
                    "7": {
                        "imgs": [
                            "/content/dice/failure.png",
                            "/content/dice/threat.png"
                        ]
                    },
                    "8": {
                        "imgs": [
                            "/content/dice/failure.png"
                        ]
                    },
                    "9": {
                        "imgs": [
                            "/content/dice/despair.png"
                        ]
                    },
                    "10": {
                        "imgs": [
                            "/content/dice/failure.png",
                            "/content/dice/failure.png"
                        ]
                    },
                    "11": {
                        "imgs": [
                            "/content/dice/failure.png",
                            "/content/dice/failure.png"
                        ]
                    },
                    "12": {
                        "imgs": []
                    }
                }
            },
            "difficulty": {
                "static": true,
                "value": "d8",
                "display": {
                    "background-color": "rgb(85,35,130)",
                    "border": "1px solid black"
                },
                "results": {
                    "1": {
                        "t": 1
                    },
                    "2": {
                        "f": 1
                    },
                    "3": {
                        "f": 1,
                        "t": 1
                    },
                    "4": {
                        "t": 1
                    },
                    "6": {
                        "t": 2
                    },
                    "7": {
                        "f": 2
                    },
                    "8": {
                        "t": 1
                    }
                },
                "translations": {
                    "1": {
                        "imgs": [
                            "/content/dice/threat.png"
                        ]
                    },
                    "2": {
                        "imgs": [
                            "/content/dice/failure.png"
                        ]
                    },
                    "3": {
                        "imgs": [
                            "/content/dice/failure.png",
                            "/content/dice/threat.png"
                        ]
                    },
                    "4": {
                        "imgs": [
                            "/content/dice/threat.png"
                        ]
                    },
                    "5": {
                        "imgs": []
                    },
                    "6": {
                        "imgs": [
                            "/content/dice/threat.png",
                            "/content/dice/threat.png"
                        ]
                    },
                    "7": {
                        "imgs": [
                            "/content/dice/failure.png",
                            "/content/dice/failure.png"
                        ]
                    },
                    "8": {
                        "imgs": [
                            "/content/dice/threat.png"
                        ]
                    }
                }
            },
            "setback": {
                "static": true,
                "value": "d6",
                "display": {
                    "background-color": "black",
                    "border": "1px solid black"
                },
                "results": {
                    "1": {
                        "f": 1
                    },
                    "2": {
                        "f": 1
                    },
                    "3": {
                        "t": 1
                    },
                    "4": {
                        "t": 1
                    }
                },
                "translations": {
                    "1": {
                        "imgs": [
                            "/content/dice/failure.png"
                        ],
                        "f": 1
                    },
                    "2": {
                        "imgs": [
                            "/content/dice/failure.png"
                        ],
                        "f": 1
                    },
                    "3": {
                        "imgs": [
                            "/content/dice/threat.png"
                        ],
                        "t": 1
                    },
                    "4": {
                        "imgs": [
                            "/content/dice/threat.png"
                        ],
                        "t": 1
                    },
                    "5": {},
                    "6": {}
                }
            },
            "force": {
                "static": true,
                "value": "d12",
                "display": {
                    "background-color": "white",
                    "border": "1px solid black",
                    "color": "black"
                },
                "results": {
                    "1": {
                        "dark": 1
                    },
                    "2": {
                        "light": 2
                    },
                    "3": {
                        "dark": 1
                    },
                    "4": {
                        "light": 2
                    },
                    "5": {
                        "dark": 1
                    },
                    "6": {
                        "light": 2
                    },
                    "7": {
                        "dark": 1
                    },
                    "8": {
                        "light": 1
                    },
                    "9": {
                        "dark": 1
                    },
                    "10": {
                        "light": 1
                    },
                    "11": {
                        "dark": 1
                    },
                    "12": {
                        "dark": 2
                    }
                },
                "translations": {
                    "1": {
                        "imgs": [
                            "/content/dice/darkside.png"
                        ]
                    },
                    "2": {
                        "imgs": [
                            "/content/dice/lightside.png",
                            "/content/dice/lightside.png"
                        ]
                    },
                    "3": {
                        "imgs": [
                            "/content/dice/darkside.png"
                        ]
                    },
                    "4": {
                        "imgs": [
                            "/content/dice/lightside.png",
                            "/content/dice/lightside.png"
                        ]
                    },
                    "5": {
                        "imgs": [
                            "/content/dice/darkside.png"
                        ]
                    },
                    "6": {
                        "imgs": [
                            "/content/dice/lightside.png",
                            "/content/dice/lightside.png"
                        ]
                    },
                    "7": {
                        "imgs": [
                            "/content/dice/darkside.png"
                        ]
                    },
                    "8": {
                        "imgs": [
                            "/content/dice/lightside.png"
                        ]
                    },
                    "9": {
                        "imgs": [
                            "/content/dice/darkside.png"
                        ]
                    },
                    "10": {
                        "imgs": [
                            "/content/dice/lightside.png"
                        ]
                    },
                    "11": {
                        "imgs": [
                            "/content/dice/darkside.png"
                        ]
                    },
                    "12": {
                        "imgs": [
                            "/content/dice/darkside.png",
                            "/content/dice/darkside.png"
                        ]
                    }
                }
            },
            "fate": {
                "value": "(d3-2)",
                "results": {
                    "0": {},
                    "1": {
                        "plus": 1
                    },
                    "-1": {
                        "minus": 1
                    }
                },
                "translations": {
                    "0": {},
                    "1": {
                        "imgs": [
                            "/content/dice/plus.png"
                        ],
                        "plus": 1
                    },
                    "-1": {
                        "imgs": [
                            "/content/dice/minus.png"
                        ],
                        "minus": 1
                    }
                }
            }
        }
    }
}

/*
    CHARACTER TEMPLATE
*/

_baseTemplate.actors["Character"] = {
    "_version": "NEW_CHARACTER",
    "_type": "Character",
    "_t": "c",
    "info": {
        "name": {
            "name": "Name",
            "current": "Miranda Stonehenge :)"
        },
        "img": {
            "name": "Character Art",
            "current": ""
        },
        "notes": {
            "name": "Notes",
            "current": ""
        },
        "race": {
            "name": "Race",
            "current": ""
        },
        "class": {
            "name": "Class",
            "current": ""
        },
        "back": {
            "name": "Background",
            "current": ""
        },
        "size": {
            "name": "Size",
            "current": ""
        },
        "source": {
            "name": "Source"
        },
        "alignment": {
            "name": "Alignment",
            "current": ""
        },
        "spellcastingAbility": {
            "name": "Spellcasting Ability",
            "current": "Cha"
        }
    },
    "stats": {
        "Str": {
            "name": "Strength",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": -1
            },
            "bonus": -1,
            "save": -1,
            "saveProf": 0
        },
        "Dex": {
            "name": "Dexterity",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 1
            },
            "bonus": 1,
            "save": 1
        },
        "Con": {
            "name": "Constitution",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 1
            },
            "bonus": 1,
            "save": 1
        },
        "Int": {
            "name": "Intelligence",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 5
            },
            "bonus": 5,
            "save": 5
        },
        "Wis": {
            "name": "Wisdom",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 5
            },
            "bonus": 5,
            "save": 5,
            "saveProf": 0
        },
        "Cha": {
            "name": "Charisma",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 2
            },
            "bonus": 2,
            "save": 2
        }
    },
    "counters": {
        "level": {
            "name": "Level",
            "current": "1",
            "min": 0,

        },
        "exp": {
            "name": "Experience",
            "current": 0,
            "min": 0,

        },
        "hp": {
            "name": "Hit Points",
            "current": 10,
            "min": 0,
            "max": 10,

        },
        "speed": {
            "name": "Speed",
            "current": "30",

        },
        "ac": {
            "name": "Armor",
            "current": 0,

        },
        "proficiency": {
            "name": "Proficiency",
            "current": "2",
            "min": 0,

        },
        "inspiration": {
            "name": "Inspiration",
            "current": "10",
            "min": 0,

        },
        "svDeath": {
            "name": "Death Save",
            "current": 1,
            "min": 0,

        },
        "svLife": {
            "name": "Life Save",
            "current": 0,
            "min": 0,

        },
        "spellAbility": {
            "name": "Spellcasting Ability",
            "current": 0,

        },
        "baseAC": {
            "name": "Base Armor Class",
            "current": "10"
        },
        "hitDiceAmount": {
            "name": "Hit Dice",
            "current": "1",
            "min": "0",
            "max": "5"
        },
        "hitDice": {
            "name": "Hit Dice",
            "current": "1d10"
        },
        "initiative": {
            "name": "Initiative",
            "current": "20"
        },
        "tempHP": {
            "name": "Temporary Hit Points",
            "current": "0"
        },
        "tab": {
            "current": 1
        },
        "spell1": {
            "current": 0,
            "max": 0,
        },
        "spell2": {
            "current": 0,
            "max": 0,
        },
        "spell3": {
            "current": 0,
            "max": 0,
        },
        "spell4": {
            "current": 0,
            "max": 0,
        },
        "spell5": {
            "current": 0,
            "max": 0,
        },
        "spell6": {
            "current": 0,
            "max": 0,
        },
        "spell7": {
            "current": 0,
            "max": 0,
        },
        "spell8": {
            "current": 0,
            "max": 0,
        },
        "spell9": {
            "current": 0,
            "max": 0,
        },
        "tracker": {
            "name":"Tracker",
            "current": 0,
            "max":0,
        }
    },
    "tags": {},
    "skills": {
        "acr": {
            "name": "Acrobatics (Dex)",
            "current": 3,
            "prof": 0
        },
        "ani": {
            "name": "Animal Handling (Wis)",
            "current": 5,
            "prof": 0
        },
        "arc": {
            "name": "Arcana (Int)",
            "current": 5,
            "prof": 0
        },
        "ath": {
            "name": "Athletics (Str)",
            "current": -1,
            "prof": 0,
        },
        "dec": {
            "name": "Deception (Cha)",
            "current": 2,
            "prof": 0
        },
        "his": {
            "name": "History (Int)",
            "current": 5,
            "prof": 0
        },
        "ins": {
            "name": "Insight (Wis)",
            "current": 5,
            "prof": 0
        },
        "int": {
            "name": "Intimidation (Cha)",
            "current": 2,
            "prof": 0
        },
        "inv": {
            "name": "Investigation (Int)",
            "current": 5,
            "prof": 0
        },
        "med": {
            "name": "Medicine (Wis)",
            "current": 5,
            "prof": 0
        },
        "nat": {
            "name": "Nature (Int)",
            "current": 5,
            "prof": 0
        },
        "per": {
            "name": "Perception (Wis)",
            "current": 5,
            "prof": 0
        },
        "pfm": {
            "name": "Performance (Cha)",
            "current": 2,
            "prof": 0
        },
        "prs": {
            "name": "Persuasion (Cha)",
            "current": 2,
            "prof": 0
        },
        "rel": {
            "name": "Religion (Int)",
            "current": 5,
            "prof": 0
        },
        "sle": {
            "name": "Sleight of Hand (Dex)",
            "current": 1,
            "prof": 0
        },
        "ste": {
            "name": "Stealth (Dex)",
            "current": 1,
            "prof": 0
        },
        "sur": {
            "name": "Survival (Wis)",
            "current": 5,
            "prof": 0
        }
    },
    "_calc": [
        {
            "name": "Stat-Bonuses",
            "target": "stats.Str.bonus",
            "eq": "(R@c.stats.Str/30*15)f-5"
        },
        {
            "target": "stats.Dex.bonus",
            "eq": "(R@c.stats.Dex/30*15)f-5"
        },
        {
            "target": "stats.Con.bonus",
            "eq": "(R@c.stats.Con/30*15)f-5"
        },
        {
            "target": "stats.Int.bonus",
            "eq": "(R@c.stats.Int/30*15)f-5"
        },
        {
            "target": "stats.Wis.bonus",
            "eq": "(R@c.stats.Wis/30*15)f-5"
        },
        {
            "target": "stats.Cha.bonus",
            "eq": "(R@c.stats.Cha/30*15)f-5"
        },
        {
            "name": "Saving Bonuses",
            "target": "stats.Str.save",
            "eq": "@c.stats.Str.bonus + (@c.stats.Str.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Dex.save",
            "eq": "@c.stats.Dex.bonus + (@c.stats.Dex.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Con.save",
            "eq": "@c.stats.Con.bonus + (@c.stats.Con.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Int.save",
            "eq": "@c.stats.Int.bonus + (@c.stats.Int.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Wis.save",
            "eq": "@c.stats.Wis.bonus + (@c.stats.Wis.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Cha.save",
            "eq": "@c.stats.Cha.bonus +(@c.stats.Cha.saveProf?@proficiency:0)"
        },
        {
            "target": "",
            "cond": "",
            "eq": ""
        },
        {
            "target": "skills.ath",
            "cond": "",
            "eq": "@c.stats.Str.bonus + (@c.skills.ath.prof?@proficiency:0) "
        },
        {
            "target": "skills.acr",
            "cond": "",
            "eq": "@c.stats.Dex.bonus + (@c.skills.acr.prof?@proficiency:0) "
        },
        {
            "target": "skills.ste",
            "cond": "",
            "eq": "@c.stats.Dex.bonus + (@c.skills.ste.prof?@proficiency:0) "
        },
        {
            "target": "skills.sle",
            "cond": "",
            "eq": "@c.stats.Dex.bonus + (@c.skills.sle.prof?@proficiency:0) "
        },
        {
            "target": "skills.ani",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.ani.prof?@proficiency:0) "
        },
        {
            "target": "skills.med",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.med.prof?@proficiency:0) "
        },
        {
            "target": "skills.per",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.per.prof?@proficiency:0) "
        },
        {
            "target": "skills.sur",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.sur.prof?@proficiency:0) "
        },
        {
            "target": "skills.int",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.int.prof?@proficiency:0) "
        },
        {
            "target": "skills.pfm",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.pfm.prof?@proficiency:0) "
        },
        {
            "target": "skills.prs",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.prs.prof?@proficiency:0) "
        },
        {
            "target": "skills.dec",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.dec.prof?@proficiency:0) "
        },
        {
            "target": "skills.his",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.his.prof?@proficiency:0) "
        },
        {
            "target": "skills.nat",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.nat.prof?@proficiency:0) "
        },
        {
            "target": "skills.rel",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.rel.prof?@proficiency:0) "
        },
        {
            "target": "skills.arc",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.arc.prof?@proficiency:0) "
        },
        {
            "target": "skills.inv",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.inv.prof?@proficiency:0) "
        },
        {
            "target": "skills.ins",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.ins.prof?@proficiency:0) "
        },
        {
            "target": "",
            "cond": "",
            "eq": ""
        },
        {
            "name": "Proficiency",
            "target": "counters.proficiency",
            "eq": "((7+@c.counters.level)/4)f"
        },

    ],
    "_flags": {},
    "damageModifiers": [],
    "attackModifiers": [],
    "elements":{},
}
/*
    Monster Template
*/

_baseTemplate.actors["Monster"] = {
    "_version": "NEW_CHARACTER",
    "_type": "Monster",
    "_t": "c",
    "info": {
        "name": {
            "name": "Name",
            "current": "Miranda Stonehenge :)"
        },
        "img": {
            "name": "Character Art",
            "current": ""
        },
        "notes": {
            "name": "Notes",
            "current": ""
        },
        "race": {
            "name": "Race",
            "current": ""
        },
        "size": {
            "name": "Size",
            "current": ""
        },
        "source": {
            "name": "Source"
        },
        "alignment": {
            "name": "Alignment",
            "current": ""
        },
        "spellcastingAbility": {
            "name": "Spellcasting Ability",
            "current": "Cha"
        }
    },
    "stats": {
        "Str": {
            "name": "Strength",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": -1
            },
            "bonus": -1,
            "save": -1,
            "saveProf": 0
        },
        "Dex": {
            "name": "Dexterity",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 1
            },
            "bonus": 1,
            "save": 1
        },
        "Con": {
            "name": "Constitution",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 1
            },
            "bonus": 1,
            "save": 1
        },
        "Int": {
            "name": "Intelligence",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 5
            },
            "bonus": 5,
            "save": 5
        },
        "Wis": {
            "name": "Wisdom",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 5
            },
            "bonus": 5,
            "save": 5,
            "saveProf": 0
        },
        "Cha": {
            "name": "Charisma",
            "current": "10",
            "min": 0,
            "modifiers": {
                "Stat-Bonus": 2
            },
            "bonus": 2,
            "save": 2
        }
    },
    "counters": {
        "cr": {
            "name": "Challenge Rating",
            "current": "1",
            "min": 0,

        },
        "hp": {
            "name": "Hit Points",
            "current": 10,
            "min": 0,
            "max": 10,
        },
        "hpDice": {
            "name": "Hit Points Dice",
            "current": 10,
        },
        "speed": {
            "name": "Speed",
            "current": "30",
        },
        "proficiency": {
            "name": "Proficiency",
            "current": "2",
            "min": 0,
        },
        "svDeath": {
            "name": "Death Save",
            "current": 1,
            "min": 0,

        },
        "svLife": {
            "name": "Life Save",
            "current": 0,
            "min": 0,

        },
        "spellAbility": {
            "name": "Spellcasting Ability",
            "current": 0,

        },
        "baseAC": {
            "name": "Base Armor Class",
            "current": "10"
        },
        "tempHP": {
            "name": "Temporary Hit Points",
            "current": "0"
        },
        "tab": {
            "current": 1
        },
        "spell1": {
            "current": 0,
            "max": 0,
        },
        "spell2": {
            "current": 0,
            "max": 0,
        },
        "spell3": {
            "current": 0,
            "max": 0,
        },
        "spell4": {
            "current": 0,
            "max": 0,
        },
        "spell5": {
            "current": 0,
            "max": 0,
        },
        "spell6": {
            "current": 0,
            "max": 0,
        },
        "spell7": {
            "current": 0,
            "max": 0,
        },
        "spell8": {
            "current": 0,
            "max": 0,
        },
        "spell9": {
            "current": 0,
            "max": 0,
        },
        "tracker": {
            "name":"Tracker",
            "current": 0,
            "max":0,
        }
    },
    "tags": {},
    "skills": {
        "acr": {
            "name": "Acrobatics (Dex)",
            "current": 3,
            "prof": 0
        },
        "ani": {
            "name": "Animal Handling (Wis)",
            "current": 5,
            "prof": 0
        },
        "arc": {
            "name": "Arcana (Int)",
            "current": 5,
            "prof": 0
        },
        "ath": {
            "name": "Athletics (Str)",
            "current": -1,
            "prof": 0,
        },
        "dec": {
            "name": "Deception (Cha)",
            "current": 2,
            "prof": 0
        },
        "his": {
            "name": "History (Int)",
            "current": 5,
            "prof": 0
        },
        "ins": {
            "name": "Insight (Wis)",
            "current": 5,
            "prof": 0
        },
        "int": {
            "name": "Intimidation (Cha)",
            "current": 2,
            "prof": 0
        },
        "inv": {
            "name": "Investigation (Int)",
            "current": 5,
            "prof": 0
        },
        "med": {
            "name": "Medicine (Wis)",
            "current": 5,
            "prof": 0
        },
        "nat": {
            "name": "Nature (Int)",
            "current": 5,
            "prof": 0
        },
        "per": {
            "name": "Perception (Wis)",
            "current": 5,
            "prof": 0
        },
        "pfm": {
            "name": "Performance (Cha)",
            "current": 2,
            "prof": 0
        },
        "prs": {
            "name": "Persuasion (Cha)",
            "current": 2,
            "prof": 0
        },
        "rel": {
            "name": "Religion (Int)",
            "current": 5,
            "prof": 0
        },
        "sle": {
            "name": "Sleight of Hand (Dex)",
            "current": 1,
            "prof": 0
        },
        "ste": {
            "name": "Stealth (Dex)",
            "current": 1,
            "prof": 0
        },
        "sur": {
            "name": "Survival (Wis)",
            "current": 5,
            "prof": 0
        }
    },
    "_calc": [
        {
            "name": "Stat-Bonuses",
            "target": "stats.Str.bonus",
            "eq": "(R@c.stats.Str/30*15)f-5"
        },
        {
            "target": "stats.Dex.bonus",
            "eq": "(R@c.stats.Dex/30*15)f-5"
        },
        {
            "target": "stats.Con.bonus",
            "eq": "(R@c.stats.Con/30*15)f-5"
        },
        {
            "target": "stats.Int.bonus",
            "eq": "(R@c.stats.Int/30*15)f-5"
        },
        {
            "target": "stats.Wis.bonus",
            "eq": "(R@c.stats.Wis/30*15)f-5"
        },
        {
            "target": "stats.Cha.bonus",
            "eq": "(R@c.stats.Cha/30*15)f-5"
        },
        {
            "name": "Saving Bonuses",
            "target": "stats.Str.save",
            "eq": "@c.stats.Str.bonus + (@c.stats.Str.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Dex.save",
            "eq": "@c.stats.Dex.bonus + (@c.stats.Dex.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Con.save",
            "eq": "@c.stats.Con.bonus + (@c.stats.Con.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Int.save",
            "eq": "@c.stats.Int.bonus + (@c.stats.Int.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Wis.save",
            "eq": "@c.stats.Wis.bonus + (@c.stats.Wis.saveProf?@proficiency:0)"
        },
        {
            "target": "stats.Cha.save",
            "eq": "@c.stats.Cha.bonus +(@c.stats.Cha.saveProf?@proficiency:0)"
        },
        {
            "target": "",
            "cond": "",
            "eq": ""
        },
        {
            "target": "skills.ath",
            "cond": "",
            "eq": "@c.stats.Str.bonus + (@c.skills.ath.prof?@proficiency:0) "
        },
        {
            "target": "skills.acr",
            "cond": "",
            "eq": "@c.stats.Dex.bonus + (@c.skills.acr.prof?@proficiency:0) "
        },
        {
            "target": "skills.ste",
            "cond": "",
            "eq": "@c.stats.Dex.bonus + (@c.skills.ste.prof?@proficiency:0) "
        },
        {
            "target": "skills.sle",
            "cond": "",
            "eq": "@c.stats.Dex.bonus + (@c.skills.sle.prof?@proficiency:0) "
        },
        {
            "target": "skills.ani",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.ani.prof?@proficiency:0) "
        },
        {
            "target": "skills.med",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.med.prof?@proficiency:0) "
        },
        {
            "target": "skills.per",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.per.prof?@proficiency:0) "
        },
        {
            "target": "skills.sur",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.sur.prof?@proficiency:0) "
        },
        {
            "target": "skills.int",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.int.prof?@proficiency:0) "
        },
        {
            "target": "skills.pfm",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.pfm.prof?@proficiency:0) "
        },
        {
            "target": "skills.prs",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.prs.prof?@proficiency:0) "
        },
        {
            "target": "skills.dec",
            "cond": "",
            "eq": "@c.stats.Cha.bonus + (@c.skills.dec.prof?@proficiency:0) "
        },
        {
            "target": "skills.his",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.his.prof?@proficiency:0) "
        },
        {
            "target": "skills.nat",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.nat.prof?@proficiency:0) "
        },
        {
            "target": "skills.rel",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.rel.prof?@proficiency:0) "
        },
        {
            "target": "skills.arc",
            "cond": "",
            "eq": "@c.stats.Int.bonus + (@c.skills.arc.prof?@proficiency:0) "
        },
        {
            "target": "skills.inv",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.inv.prof?@proficiency:0) "
        },
        {
            "target": "skills.ins",
            "cond": "",
            "eq": "@c.stats.Wis.bonus + (@c.skills.ins.prof?@proficiency:0) "
        }

    ],
    "_flags": {},
    "damageModifiers": [],
    "attackModifiers": [],
    "elements":{},
}


/*
    FiveForge Data
*/

_baseTemplate.FiveForge  = {
    VERSION: "1.0.3 Beta",
}