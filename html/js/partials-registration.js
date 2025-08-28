(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['class_talents'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"col-md-6\">\n        <h4>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":21}}}) : helper)))
    + "</h4>\n        <table class=\"talent-trees-table\">\n            <tbody>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"talents_types_sorted") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":19,"column":25}}})) != null ? stack1 : "")
    + "            </tbody>\n        </table>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"2") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":20},"end":{"line":18,"column":27}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <tr class=\"talent-tree-row\">\n                            <td class=\"talent-tree-cell\">\n                                <div class=\"talent-tree-header\">\n                                    <a href=\"#talents/"
    + alias3((lookupProperty(helpers,"toUnsafeHtmlId")||(depth0 && lookupProperty(depth0,"toUnsafeHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"key") : depth0),{"name":"toUnsafeHtmlId","hash":{},"data":data,"loc":{"start":{"line":13,"column":54},"end":{"line":13,"column":76}}}))
    + "\" class=\"talent-tree-link\" data-talent-type=\""
    + alias3((lookupProperty(helpers,"toUnsafeHtmlId")||(depth0 && lookupProperty(depth0,"toUnsafeHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"key") : depth0),{"name":"toUnsafeHtmlId","hash":{},"data":data,"loc":{"start":{"line":13,"column":121},"end":{"line":13,"column":143}}}))
    + "\" data-talent-display-name=\""
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"2") : stack1),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":13,"column":171},"end":{"line":13,"column":196}}}))
    + "\">"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"2") : stack1),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":13,"column":198},"end":{"line":13,"column":223}}}))
    + "</a> "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_mastery"),(depth0 != null ? lookupProperty(depth0,"value") : depth0),{"name":"talent_mastery","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n                                </div>\n                                <div data-talent-type=\""
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"key") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":15,"column":55},"end":{"line":15,"column":71}}}))
    + "\" class=\"class-talents-detail "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"0") : stack1),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":101},"end":{"line":15,"column":139}}})) != null ? stack1 : "")
    + "\"></div>\n                            </td>\n                        </tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "locked";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"talents_types") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":0},"end":{"line":44,"column":0}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"col-md-6\">\n        <h4>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":26,"column":12},"end":{"line":26,"column":21}}}) : helper)))
    + "</h4>\n        <table class=\"talent-trees-table\">\n            <tbody>\n"
    + ((stack1 = (lookupProperty(helpers,"eachProperty")||(depth0 && lookupProperty(depth0,"eachProperty"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"talents_types") : depth0),{"name":"eachProperty","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":16},"end":{"line":40,"column":33}}})) != null ? stack1 : "")
    + "            </tbody>\n        </table>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"talents_types_sorted") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":44,"column":7}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['class_talents_detail'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <td class=\"talent-icon-cell\">\n                <a href=\"#\" class=\"individual-talent-link\" data-talent-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":75},"end":{"line":6,"column":81}}}) : helper)))
    + "\" data-talent-type=\""
    + alias4(container.lambda((depths[1] != null ? lookupProperty(depths[1],"type") : depths[1]), depth0))
    + "\" data-talent-name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":6,"column":132},"end":{"line":6,"column":140}}}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":6,"column":149},"end":{"line":6,"column":157}}}) : helper)))
    + "\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_img"),depth0,{"name":"talent_img","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </a>\n            </td>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<table class=\"talent-icons-table\">\n    <tbody>\n        <tr class=\"talent-row\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"talents") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":10,"column":21}}})) != null ? stack1 : "")
    + "        </tr>\n    </tbody>\n</table>";
},"usePartial":true,"useData":true,"useDepths":true});
templates['dlc_notice'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"dlc-notice\">Available in "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"_dlc_name") || (depth0 != null ? lookupProperty(depth0,"_dlc_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"_dlc_name","hash":{},"data":data,"loc":{"start":{"line":2,"column":35},"end":{"line":2,"column":48}}}) : helper)))
    + " DLC</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"_dlc") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":3,"column":7}}})) != null ? stack1 : "");
},"useData":true});
templates['item_img'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<img width=\""
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":29}}}))
    + "\" height=\""
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":1,"column":39},"end":{"line":1,"column":56}}}))
    + "\" src=\"img/"
    + alias3((lookupProperty(helpers,"itemImagePath")||(depth0 && lookupProperty(depth0,"itemImagePath"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"image") : depth0),(lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":1,"column":89},"end":{"line":1,"column":104}}}),{"name":"itemImagePath","hash":{},"data":data,"loc":{"start":{"line":1,"column":67},"end":{"line":1,"column":106}}}))
    + "\" onerror=\"this.style.display='none'; this.nextElementSibling.style.display='inline-block';\" alt=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":204},"end":{"line":1,"column":212}}}) : helper)))
    + "\">\n<div class=\"item-icon-placeholder\" style=\"width: "
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":2,"column":49},"end":{"line":2,"column":66}}}))
    + "px; height: "
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":2,"column":78},"end":{"line":2,"column":95}}}))
    + "px; background: #ddd; display: none;\"></div>";
},"useData":true});
templates['item_img_large'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<img width=\"64\" height=\"64\" src=\"img/"
    + alias3((lookupProperty(helpers,"itemImagePath")||(depth0 && lookupProperty(depth0,"itemImagePath"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"image") : depth0),64,{"name":"itemImagePath","hash":{},"data":data,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":63}}}))
    + "\" onerror=\"this.style.display='none'; this.nextElementSibling.style.display='inline-block';\" alt=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":161},"end":{"line":1,"column":169}}}) : helper)))
    + "\">\n<div class=\"item-icon-placeholder\" style=\"width: 64px; height: 64px; background: #ddd; display: none;\"></div>";
},"useData":true});
templates['talent_classes'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\"#classes/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"subclass") : depth0)) != null ? lookupProperty(stack1,"class_short_name") : stack1),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":56}}}))
    + "/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"subclass") : depth0)) != null ? lookupProperty(stack1,"short_name") : stack1),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":3,"column":57},"end":{"line":3,"column":89}}}))
    + alias3(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":3,"column":89},"end":{"line":3,"column":105}}}) : helper)))
    + "\">"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"subclass") : depth0)) != null ? lookupProperty(stack1,"name") : stack1),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":3,"column":107},"end":{"line":3,"column":136}}}))
    + "</a>\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_mastery"),(depth0 != null ? lookupProperty(depth0,"value") : depth0),{"name":"talent_mastery","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['talent_details'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <dt>Requirements</dt>\n        <dd>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"multi_require") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":15,"column":19}}})) != null ? stack1 : "")
    + "        </dd>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"html-tooltip\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"\n                Requirements at 1-"
    + alias2(((helper = (helper = lookupProperty(helpers,"points") || (depth0 != null ? lookupProperty(depth0,"points") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"points","hash":{},"data":data,"loc":{"start":{"line":7,"column":34},"end":{"line":7,"column":44}}}) : helper)))
    + " talent points:\n                <ol>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"require") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":16},"end":{"line":11,"column":25}}})) != null ? stack1 : "")
    + "                </ol>\">"
    + alias2(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"require") : depth0)) != null ? lookupProperty(stack1,"0") : stack1), depth0))
    + "</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                    <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                "
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"require") : depth0)) != null ? lookupProperty(stack1,"0") : stack1), depth0)) != null ? stack1 : "")
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Use Mode</dt><dd>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"mode") || (depth0 != null ? lookupProperty(depth0,"mode") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mode","hash":{},"data":data,"loc":{"start":{"line":18,"column":37},"end":{"line":18,"column":45}}}) : helper)))
    + "</dd>";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Cost</dt><dd>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":19,"column":33},"end":{"line":19,"column":43}}}) : helper))) != null ? stack1 : "")
    + "</dd>";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Range</dt><dd>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"range") || (depth0 != null ? lookupProperty(depth0,"range") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"range","hash":{},"data":data,"loc":{"start":{"line":20,"column":35},"end":{"line":20,"column":46}}}) : helper))) != null ? stack1 : "")
    + "</dd>";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Cooldown</dt><dd>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"cooldown") || (depth0 != null ? lookupProperty(depth0,"cooldown") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cooldown","hash":{},"data":data,"loc":{"start":{"line":21,"column":41},"end":{"line":21,"column":55}}}) : helper))) != null ? stack1 : "")
    + "</dd>";
},"15":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Use Speed</dt><dd>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"use_speed") || (depth0 != null ? lookupProperty(depth0,"use_speed") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"use_speed","hash":{},"data":data,"loc":{"start":{"line":22,"column":43},"end":{"line":22,"column":56}}}) : helper)))
    + "</dd>";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>DLC</dt><dd>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"_dlc_name") || (depth0 != null ? lookupProperty(depth0,"_dlc_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"_dlc_name","hash":{},"data":data,"loc":{"start":{"line":23,"column":32},"end":{"line":23,"column":45}}}) : helper)))
    + "</dd>";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <dt class=\"multiline-dd\">Description</dt>\n        <dd>\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"info_text") || (depth0 != null ? lookupProperty(depth0,"info_text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"info_text","hash":{},"data":data,"loc":{"start":{"line":27,"column":12},"end":{"line":27,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"no_unlearn_last") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":12},"end":{"line":30,"column":19}}})) != null ? stack1 : "")
    + "        </dd>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"stock-text\">This talent can alter the world in a permanent way, as such you can never unlearn it once known.</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dl class='dl-table'>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"require") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":17,"column":11}}})) != null ? stack1 : "")
    + "    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"mode") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":4},"end":{"line":18,"column":57}}})) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"cost") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":4},"end":{"line":19,"column":55}}})) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"range") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":4},"end":{"line":20,"column":58}}})) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"cooldown") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":4},"end":{"line":21,"column":67}}})) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"use_speed") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":4},"end":{"line":22,"column":68}}})) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"_dlc") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":4},"end":{"line":23,"column":57}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"info_text") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":4},"end":{"line":32,"column":11}}})) != null ? stack1 : "")
    + "</dl>\n";
},"useData":true});
templates['talent_img'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"image","hash":{},"data":data,"loc":{"start":{"line":1,"column":106},"end":{"line":1,"column":115}}}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"toLowerCase")||(depth0 && lookupProperty(depth0,"toLowerCase"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toLowerCase","hash":{},"data":data,"loc":{"start":{"line":1,"column":123},"end":{"line":1,"column":149}}}))
    + ".png";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<img width=\""
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":29}}}))
    + "\" height=\""
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":1,"column":39},"end":{"line":1,"column":56}}}))
    + "\" src=\"img/talents/"
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":1,"column":75},"end":{"line":1,"column":92}}}))
    + "/"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"image") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":93},"end":{"line":1,"column":160}}})) != null ? stack1 : "")
    + "\" onerror=\"talentImgError(this)\">";
},"useData":true});
templates['talent_img_small'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"image") || (depth0 != null ? lookupProperty(depth0,"image") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"image","hash":{},"data":data,"loc":{"start":{"line":1,"column":61},"end":{"line":1,"column":70}}}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"toLowerCase")||(depth0 && lookupProperty(depth0,"toLowerCase"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toLowerCase","hash":{},"data":data,"loc":{"start":{"line":1,"column":78},"end":{"line":1,"column":104}}}))
    + ".png";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<img width=\"32\" height=\"32\" src=\"img/talents/32/"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"image") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":48},"end":{"line":1,"column":115}}})) != null ? stack1 : "")
    + "\" onerror=\"talentImgError(this)\">";
},"useData":true});
templates['talent_mastery'] = template({"1":function(container,depth0,helpers,partials,data) {
    return ", <a href=\"http://te4.org/wiki/Unlockables\" class=\"hint-link\" title=\"View wiki for information on unlocking\">unlockable</a>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"0") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":144},"end":{"line":2,"column":178}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return ", locked";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "(<span class=\"talent-mastery\">×"
    + container.escapeExpression((lookupProperty(helpers,"toDecimal")||(depth0 && lookupProperty(depth0,"toDecimal"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"1") : depth0),1,{"name":"toDecimal","hash":{},"data":data,"loc":{"start":{"line":1,"column":31},"end":{"line":1,"column":50}}}))
    + "</span>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"3") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":185}}})) != null ? stack1 : "")
    + ")\n";
},"useData":true});
templates['changes_talents'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h3><a class=\"anchor\" id=\"changes/talents/"
    + alias3(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":42},"end":{"line":2,"column":50}}}) : helper)))
    + "\"></a>"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":2,"column":56},"end":{"line":2,"column":76}}}))
    + "</h3>\n<div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"values") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":32,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"panel panel-default\">\n            <div class=\"panel-heading clickable\">\n                <h3 class=\"panel-title\">\n                    <a data-toggle=\"collapse\" data-target=\"#collapse-"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":8,"column":69},"end":{"line":8,"column":77}}}) : helper)))
    + "-"
    + alias4((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"id") : stack1),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":8,"column":78},"end":{"line":8,"column":99}}}))
    + "\">\n                        "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_img"),(depth0 != null ? lookupProperty(depth0,"value") : depth0),{"name":"talent_img","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = (lookupProperty(helpers,"labelForChangeType")||(depth0 && lookupProperty(depth0,"labelForChangeType"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),{"name":"labelForChangeType","hash":{},"data":data,"loc":{"start":{"line":9,"column":46},"end":{"line":9,"column":75}}})) != null ? stack1 : "")
    + " "
    + alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n                    </a>\n                </h3>\n            </div>\n            <div id=\"collapse-"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":13,"column":30},"end":{"line":13,"column":38}}}) : helper)))
    + "-"
    + alias4((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"value") : depth0)) != null ? lookupProperty(stack1,"id") : stack1),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":13,"column":39},"end":{"line":13,"column":60}}}))
    + "\" class=\"talent-details panel-collapse collapse\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"value2") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":29,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <table class=\"table table-bordered old-new\">\n                        <colgroup>\n                            <col width=\"50%\">\n                            <col width=\"50%\">\n                        </colgroup>\n                        <tr><th>Old</th><th>New</th></tr><tr>\n                            <td>"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_details"),(depth0 != null ? lookupProperty(depth0,"value2") : depth0),{"name":"talent_details","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</td>\n                            <td>"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_details"),(depth0 != null ? lookupProperty(depth0,"value") : depth0),{"name":"talent_details","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</td>\n                        </tr>\n                    </table>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"panel-body\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_details"),(depth0 != null ? lookupProperty(depth0,"value") : depth0),{"name":"talent_details","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                    </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<p>No talent changes in this version.</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":36,"column":9}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['class'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"locked_desc") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":71}}})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":18}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"flavor\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"locked_desc") || (depth0 != null ? lookupProperty(depth0,"locked_desc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"locked_desc","hash":{},"data":data,"loc":{"start":{"line":6,"column":45},"end":{"line":6,"column":60}}}) : helper)))
    + "</p>";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h3 "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"single_subclass") : depths[1]),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":10,"column":67}}})) != null ? stack1 : "")
    + ">\n            <a class=\"anchor\" id=\"classes/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"short_name") : depths[1]),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":11,"column":42},"end":{"line":11,"column":68}}}))
    + "/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":11,"column":69},"end":{"line":11,"column":92}}}))
    + "\"></a>"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":11,"column":98},"end":{"line":11,"column":126}}}))
    + "\n        </h3>\n        <div class=\"class-desc well\">\n            <div class=\"class-images\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"images") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":16},"end":{"line":17,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"locked_desc") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":19,"column":75}}})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":20,"column":22}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"dlc_notice"),depth0,{"name":"dlc_notice","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            <div class=\"wiki-link\">\n                <a href=\"http://te4.org/wiki/"
    + alias3((lookupProperty(helpers,"toWikiPage")||(depth0 && lookupProperty(depth0,"toWikiPage"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"toWikiPage","hash":{},"data":data,"loc":{"start":{"line":23,"column":45},"end":{"line":23,"column":64}}}))
    + "\">View Wiki</a>\n            </div>\n        </div>\n        <div class=\"class-detail-container container-fluid\">\n            <div class=\"col-md-12\">\n                <h4>Stats</h4>\n                <table class=\"stats-table\">\n                    <thead>\n                        <tr>\n                            <th>Strength</th>\n                            <th>Dexterity</th>\n                            <th>Constitution</th>\n                            <th>Magic</th>\n                            <th>Willpower</th>\n                            <th>Cunning</th>\n                            <th>Life per level</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td>"
    + ((stack1 = (lookupProperty(helpers,"statValue")||(depth0 && lookupProperty(depth0,"statValue"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"str") : stack1),{"name":"statValue","hash":{},"data":data,"loc":{"start":{"line":43,"column":32},"end":{"line":43,"column":57}}})) != null ? stack1 : "")
    + "</td>\n                            <td>"
    + ((stack1 = (lookupProperty(helpers,"statValue")||(depth0 && lookupProperty(depth0,"statValue"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"dex") : stack1),{"name":"statValue","hash":{},"data":data,"loc":{"start":{"line":44,"column":32},"end":{"line":44,"column":57}}})) != null ? stack1 : "")
    + "</td>\n                            <td>"
    + ((stack1 = (lookupProperty(helpers,"statValue")||(depth0 && lookupProperty(depth0,"statValue"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"con") : stack1),{"name":"statValue","hash":{},"data":data,"loc":{"start":{"line":45,"column":32},"end":{"line":45,"column":57}}})) != null ? stack1 : "")
    + "</td>\n                            <td>"
    + ((stack1 = (lookupProperty(helpers,"statValue")||(depth0 && lookupProperty(depth0,"statValue"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"mag") : stack1),{"name":"statValue","hash":{},"data":data,"loc":{"start":{"line":46,"column":32},"end":{"line":46,"column":57}}})) != null ? stack1 : "")
    + "</td>\n                            <td>"
    + ((stack1 = (lookupProperty(helpers,"statValue")||(depth0 && lookupProperty(depth0,"statValue"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"wil") : stack1),{"name":"statValue","hash":{},"data":data,"loc":{"start":{"line":47,"column":32},"end":{"line":47,"column":57}}})) != null ? stack1 : "")
    + "</td>\n                            <td>"
    + ((stack1 = (lookupProperty(helpers,"statValue")||(depth0 && lookupProperty(depth0,"statValue"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"cun") : stack1),{"name":"statValue","hash":{},"data":data,"loc":{"start":{"line":48,"column":32},"end":{"line":48,"column":57}}})) != null ? stack1 : "")
    + "</td>\n                            <td>"
    + ((stack1 = (lookupProperty(helpers,"statValue")||(depth0 && lookupProperty(depth0,"statValue"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy_add") : depth0)) != null ? lookupProperty(stack1,"life_rating") : stack1),{"name":"statValue","hash":{},"data":data,"loc":{"start":{"line":49,"column":32},"end":{"line":49,"column":68}}})) != null ? stack1 : "")
    + "</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div class=\"class-detail-container container-fluid\">\n            <div class=\"row\">\n                "
    + alias3((lookupProperty(helpers,"$")||(depth0 && lookupProperty(depth0,"$"))||alias2).call(alias1,"class_talents",{"name":"$","hash":{"css_class":"class-talents","title":"Class Talents","talents_types":(depth0 != null ? lookupProperty(depth0,"talents_types_class") : depth0),"talents_types_sorted":(depth0 != null ? lookupProperty(depth0,"talents_types_class_sorted") : depth0)},"data":data,"loc":{"start":{"line":57,"column":16},"end":{"line":57,"column":168}}}))
    + "\n                "
    + alias3((lookupProperty(helpers,"$")||(depth0 && lookupProperty(depth0,"$"))||alias2).call(alias1,"class_talents",{"name":"$","hash":{"css_class":"generic-talents","title":"Generic Talents","talents_types":(depth0 != null ? lookupProperty(depth0,"talents_types_generic") : depth0),"talents_types_sorted":(depth0 != null ? lookupProperty(depth0,"talents_types_generic_sorted") : depth0)},"data":data,"loc":{"start":{"line":58,"column":16},"end":{"line":58,"column":176}}}))
    + "\n            </div>\n        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none;\"";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img src=\"img/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"file") || (depth0 != null ? lookupProperty(depth0,"file") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"file","hash":{},"data":data,"loc":{"start":{"line":16,"column":34},"end":{"line":16,"column":42}}}) : helper)))
    + "\" width=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"width") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":16,"column":51},"end":{"line":16,"column":90}}})) != null ? stack1 : "")
    + "\" height=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"height") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":16,"column":100},"end":{"line":16,"column":141}}})) != null ? stack1 : "")
    + "\"/>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"width") || (depth0 != null ? lookupProperty(depth0,"width") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"width","hash":{},"data":data,"loc":{"start":{"line":16,"column":64},"end":{"line":16,"column":73}}}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    return "64";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"height") || (depth0 != null ? lookupProperty(depth0,"height") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"height","hash":{},"data":data,"loc":{"start":{"line":16,"column":114},"end":{"line":16,"column":124}}}) : helper)));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h2>"
    + container.escapeExpression((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":32}}}))
    + "</h2>\n<div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"single_subclass") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":8,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"subclass_list") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":4},"end":{"line":61,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true,"useDepths":true});
templates['class_nav'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li><a href=\"#classes/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":11,"column":30},"end":{"line":11,"column":53}}}))
    + alias3(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":11,"column":53},"end":{"line":11,"column":69}}}) : helper)))
    + "\"><span data-toggle=\"collapse\" data-target=\"#nav-"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":11,"column":118},"end":{"line":11,"column":141}}}))
    + "\" class=\"dropdown collapsed\"></span>"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":11,"column":177},"end":{"line":11,"column":205}}}))
    + "</a>\n            <ul class=\"nav collapse\" id=\"nav-"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":12,"column":45},"end":{"line":12,"column":68}}}))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"subclass_list") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":16},"end":{"line":15,"column":29}}})) != null ? stack1 : "")
    + "            </ul></li>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <li><a href=\"#classes/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"short_name") : depths[1]),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":14,"column":42},"end":{"line":14,"column":68}}}))
    + "/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":14,"column":69},"end":{"line":14,"column":92}}}))
    + alias3(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":14,"column":92},"end":{"line":14,"column":108}}}) : helper)))
    + "\">"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":14,"column":110},"end":{"line":14,"column":138}}}))
    + "</a></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul id=\"nav-classes\" class=\"nav\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"class_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":17,"column":13}}})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true,"useDepths":true});
templates['item_detail'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"image") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":8,"column":24},"end":{"line":12,"column":31}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"item_img_large"),depth0,{"name":"item_img_large","data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "                            <div class=\"item-icon-placeholder\" style=\"width: 64px; height: 64px; background: #ddd; display: inline-block;\"></div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "style=\"color: rgb("
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"color") : stack1)) != null ? lookupProperty(stack1,"r") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"color") : stack1)) != null ? lookupProperty(stack1,"g") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"color") : stack1)) != null ? lookupProperty(stack1,"b") : stack1), depth0))
    + ")\"";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <h3 class=\"item-type-large\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"type") : stack1), depth0))
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"subtype") : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":73},"end":{"line":19,"column":119}}})) != null ? stack1 : "")
    + "</h3>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"subtype") : stack1), depth0))
    + ")";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"item-description-full\">\n                            <p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"desc") : stack1), depth0))
    + "</p>\n                        </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"col-md-6\">\n                            <h4>Combat Statistics</h4>\n                            <table class=\"table table-condensed\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"dam") : stack1),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":32},"end":{"line":39,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"apr") : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":32},"end":{"line":42,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"physcrit") : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":32},"end":{"line":45,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"dammod") : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":32},"end":{"line":53,"column":39}}})) != null ? stack1 : "")
    + "                            </table>\n                        </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Damage</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"dam") : stack1), depth0))
    + "</td></tr>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Armor Penetration</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"apr") : stack1), depth0))
    + "</td></tr>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Physical Critical</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"physcrit") : stack1), depth0))
    + "%</td></tr>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"dammod") : stack1)) != null ? lookupProperty(stack1,"str") : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":36},"end":{"line":49,"column":43}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"dammod") : stack1)) != null ? lookupProperty(stack1,"dex") : stack1),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":36},"end":{"line":52,"column":43}}})) != null ? stack1 : "");
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <tr><td>Damage Modifier (Str)</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"dammod") : stack1)) != null ? lookupProperty(stack1,"str") : stack1), depth0))
    + "</td></tr>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <tr><td>Damage Modifier (Dex)</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1)) != null ? lookupProperty(stack1,"dammod") : stack1)) != null ? lookupProperty(stack1,"dex") : stack1), depth0))
    + "</td></tr>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Category</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"base") : stack1), depth0))
    + "</td></tr>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Type</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"type") : stack1), depth0))
    + "</td></tr>\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Subtype</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"subtype") : stack1), depth0))
    + "</td></tr>\n";
},"31":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr>\n                                        <td>Cost</td>\n                                        <td>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"cost") : stack1)) != null ? lookupProperty(stack1,"display") : stack1),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.program(34, data, 0),"data":data,"loc":{"start":{"line":74,"column":44},"end":{"line":78,"column":51}}})) != null ? stack1 : "")
    + "                                        </td>\n                                    </tr>\n";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                                "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"cost") : stack1)) != null ? lookupProperty(stack1,"display") : stack1), depth0))
    + " gold\n";
},"34":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                                "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"cost") : stack1), depth0))
    + " gold\n";
},"36":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Material Level</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"material_level") : stack1), depth0))
    + "</td></tr>\n";
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Rarity</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"rarity") : stack1), depth0))
    + "</td></tr>\n";
},"40":function(container,depth0,helpers,partials,data) {
    return "                                    <tr><td>Unique</td><td>Yes</td></tr>\n";
},"42":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <tr><td>Equipment Slot</td><td>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"slot") : stack1), depth0))
    + "</td></tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"item-detail-container\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-header\">\n                    <div class=\"item-header-full\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,(depth0 != null ? lookupProperty(depth0,"item") : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":24},"end":{"line":13,"column":33}}})) != null ? stack1 : "")
    + "                        <div class=\"item-info-full\">\n                            <h1 class=\"item-name-large\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"color") : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":56},"end":{"line":15,"column":153}}})) != null ? stack1 : "")
    + ">\n                                "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n                            </h1>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":28},"end":{"line":20,"column":35}}})) != null ? stack1 : "")
    + "                        </div>\n                    </div>\n                </div>\n                \n                <div class=\"panel-body\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"desc") : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":20},"end":{"line":30,"column":27}}})) != null ? stack1 : "")
    + "                    \n                    <div class=\"row\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"combat") : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":24},"end":{"line":56,"column":31}}})) != null ? stack1 : "")
    + "                        \n                        <div class=\"col-md-6\">\n                            <h4>Properties</h4>\n                            <table class=\"table table-condensed\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"base") : stack1),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":61,"column":32},"end":{"line":63,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":32},"end":{"line":66,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"subtype") : stack1),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":32},"end":{"line":69,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"cost") : stack1),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":70,"column":32},"end":{"line":81,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"material_level") : stack1),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":82,"column":32},"end":{"line":84,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"rarity") : stack1),{"name":"if","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":85,"column":32},"end":{"line":87,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"unique") : stack1),{"name":"if","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":88,"column":32},"end":{"line":90,"column":39}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item") : depth0)) != null ? lookupProperty(stack1,"slot") : stack1),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":91,"column":32},"end":{"line":93,"column":39}}})) != null ? stack1 : "")
    + "                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"usePartial":true,"useData":true});
templates['item_list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"capitalize")||(depth0 && lookupProperty(depth0,"capitalize"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"category") : depth0),{"name":"capitalize","hash":{},"data":data,"loc":{"start":{"line":2,"column":24},"end":{"line":2,"column":47}}}));
},"3":function(container,depth0,helpers,partials,data) {
    return "All Items";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"col-md-3 col-lg-2 col-sm-4 col-xs-6\">\n            <div class=\"item-tile\">\n                <a href=\"#items/"
    + alias1(container.lambda((depths[1] != null ? lookupProperty(depths[1],"category") : depths[1]), depth0))
    + "/"
    + alias1(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":8,"column":48},"end":{"line":8,"column":54}}}) : helper)))
    + "\" class=\"item-link\">\n                    <div class=\"item-icon-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"image") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.program(8, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":10,"column":24},"end":{"line":14,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n                    <div class=\"item-name-container\">\n                        <span class=\"item-name\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"color") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":48},"end":{"line":17,"column":125}}})) != null ? stack1 : "")
    + ">\n                            "
    + alias1(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":18,"column":28},"end":{"line":18,"column":36}}}) : helper)))
    + "\n                        </span>\n                    </div>\n                </a>\n            </div>\n        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"item_img"),depth0,{"name":"item_img","data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"item-icon-placeholder\" style=\"width: "
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":13,"column":77},"end":{"line":13,"column":94}}}))
    + "px; height: "
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":13,"column":106},"end":{"line":13,"column":123}}}))
    + "px; background: #ddd;\"></div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "style=\"color: rgb("
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? lookupProperty(stack1,"r") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? lookupProperty(stack1,"g") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? lookupProperty(stack1,"b") : stack1), depth0))
    + ")\"";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"items-container\">\n    <h2>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"category") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":71}}})) != null ? stack1 : "")
    + " ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"items") : depth0)) != null ? lookupProperty(stack1,"length") : stack1), depth0))
    + " shown)</h2>\n    \n    <div class=\"row\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":24,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true,"useDepths":true});
templates['item_list_grouped'] = template({"1":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"capitalize")||(depth0 && lookupProperty(depth0,"capitalize"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"category") : depth0),{"name":"capitalize","hash":{},"data":data,"loc":{"start":{"line":2,"column":24},"end":{"line":2,"column":47}}}));
},"3":function(container,depth0,helpers,partials,data) {
    return "All Items";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"main-equipment-group\">\n            <h2 class=\"main-group-title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":6,"column":41},"end":{"line":6,"column":49}}}) : helper)))
    + "</h2>\n            \n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":35,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"sub-equipment-group\">\n                    <h4 class=\"sub-group-title\">"
    + alias2(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":10,"column":48},"end":{"line":10,"column":56}}}) : helper)))
    + " ("
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"length") : depth0), depth0))
    + ")</h4>\n                    <div class=\"row\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":24},"end":{"line":32,"column":33}}})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"col-md-3 col-lg-2 col-sm-4 col-xs-6\">\n                            <div class=\"item-tile item-popup-link\" data-item-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":14,"column":81},"end":{"line":14,"column":87}}}) : helper)))
    + "\" data-item-name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":14,"column":105},"end":{"line":14,"column":113}}}) : helper)))
    + "\">\n                                <div class=\"item-icon-container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"image") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":16,"column":36},"end":{"line":20,"column":43}}})) != null ? stack1 : "")
    + "                                </div>\n                                <div class=\"item-name-container\">\n                                    <div class=\"item-name-with-color\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"color") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":40},"end":{"line":26,"column":47}}})) != null ? stack1 : "")
    + "                                        <span class=\"item-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":27,"column":64},"end":{"line":27,"column":72}}}) : helper)))
    + "</span>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"item_img"),depth0,{"name":"item_img","data":data,"indent":"                                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <div class=\"item-icon-placeholder\" style=\"width: "
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":19,"column":89},"end":{"line":19,"column":106}}}))
    + "px; height: "
    + alias3((lookupProperty(helpers,"opt")||(depth0 && lookupProperty(depth0,"opt"))||alias2).call(alias1,"imgSize",{"name":"opt","hash":{},"data":data,"loc":{"start":{"line":19,"column":118},"end":{"line":19,"column":135}}}))
    + "px; background: #ddd;\"></div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                            <div class=\"item-color-indicator\" style=\"background-color: rgb("
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? lookupProperty(stack1,"r") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? lookupProperty(stack1,"g") : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? lookupProperty(stack1,"b") : stack1), depth0))
    + ");\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"items-container\">\n    <h2>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"category") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":71}}})) != null ? stack1 : "")
    + " ("
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"totalItems") || (depth0 != null ? lookupProperty(depth0,"totalItems") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"totalItems","hash":{},"data":data,"loc":{"start":{"line":2,"column":73},"end":{"line":2,"column":87}}}) : helper)))
    + " total)</h2>\n    \n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":37,"column":13}}})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
templates['item_nav'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li><a href=\"#items/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":28},"end":{"line":3,"column":34}}}) : helper)))
    + alias4(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":3,"column":34},"end":{"line":3,"column":50}}}) : helper)))
    + "\"><span class=\"no-dropdown\"></span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":85},"end":{"line":3,"column":93}}}) : helper)))
    + " ("
    + alias4(((helper = (helper = lookupProperty(helpers,"count") || (depth0 != null ? lookupProperty(depth0,"count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data,"loc":{"start":{"line":3,"column":95},"end":{"line":3,"column":104}}}) : helper)))
    + ")</a></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul id=\"nav-items\" class=\"nav\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":13}}})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
templates['race'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"locked_desc") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":71}}})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":18}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"flavor\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"locked_desc") || (depth0 != null ? lookupProperty(depth0,"locked_desc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"locked_desc","hash":{},"data":data,"loc":{"start":{"line":7,"column":45},"end":{"line":7,"column":60}}}) : helper)))
    + "</p>";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h3 "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"single_subrace") : depths[1]),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":11,"column":66}}})) != null ? stack1 : "")
    + ">\n            <a class=\"anchor\" id=\"races/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"short_name") : depths[1]),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":12,"column":40},"end":{"line":12,"column":66}}}))
    + "/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":12,"column":67},"end":{"line":12,"column":90}}}))
    + "\"></a>"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":12,"column":96},"end":{"line":12,"column":124}}}))
    + "\n        </h3>\n        <div class=\"race-desc well\">\n            <div class=\"race-images\">\n"
    + ((stack1 = (lookupProperty(helpers,"choose")||(depth0 && lookupProperty(depth0,"choose"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"images") : depth0),{"name":"choose","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":16},"end":{"line":18,"column":27}}})) != null ? stack1 : "")
    + "            </div>\n            "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"locked_desc") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":20,"column":75}}})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":21,"column":12},"end":{"line":21,"column":22}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"dlc_notice"),depth0,{"name":"dlc_notice","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            <div class=\"wiki-link\">\n                <a href=\"http://te4.org/wiki/"
    + alias3((lookupProperty(helpers,"toWikiPage")||(depth0 && lookupProperty(depth0,"toWikiPage"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"toWikiPage","hash":{},"data":data,"loc":{"start":{"line":24,"column":45},"end":{"line":24,"column":64}}}))
    + "\">View Wiki</a>\n            </div>\n        </div>\n        <div class=\"class-detail-container container-fluid\">\n            <div class=\"col-md-4 stats\">\n                <h4>Stats</h4>\n                <dl class=\"dl-horizontal\">\n                    "
    + alias3((lookupProperty(helpers,"stat")||(depth0 && lookupProperty(depth0,"stat"))||alias2).call(alias1,"Strength",((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"str") : stack1),{"name":"stat","hash":{},"data":data,"loc":{"start":{"line":31,"column":20},"end":{"line":31,"column":49}}}))
    + "\n                    "
    + alias3((lookupProperty(helpers,"stat")||(depth0 && lookupProperty(depth0,"stat"))||alias2).call(alias1,"Dexterity",((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"dex") : stack1),{"name":"stat","hash":{},"data":data,"loc":{"start":{"line":32,"column":20},"end":{"line":32,"column":50}}}))
    + "\n                    "
    + alias3((lookupProperty(helpers,"stat")||(depth0 && lookupProperty(depth0,"stat"))||alias2).call(alias1,"Constitution",((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"con") : stack1),{"name":"stat","hash":{},"data":data,"loc":{"start":{"line":33,"column":20},"end":{"line":33,"column":53}}}))
    + "\n                    "
    + alias3((lookupProperty(helpers,"stat")||(depth0 && lookupProperty(depth0,"stat"))||alias2).call(alias1,"Magic",((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"mag") : stack1),{"name":"stat","hash":{},"data":data,"loc":{"start":{"line":34,"column":20},"end":{"line":34,"column":46}}}))
    + "\n                    "
    + alias3((lookupProperty(helpers,"stat")||(depth0 && lookupProperty(depth0,"stat"))||alias2).call(alias1,"Willpower",((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"wil") : stack1),{"name":"stat","hash":{},"data":data,"loc":{"start":{"line":35,"column":20},"end":{"line":35,"column":50}}}))
    + "\n                    "
    + alias3((lookupProperty(helpers,"stat")||(depth0 && lookupProperty(depth0,"stat"))||alias2).call(alias1,"Cunning",((stack1 = (depth0 != null ? lookupProperty(depth0,"stats") : depth0)) != null ? lookupProperty(stack1,"cun") : stack1),{"name":"stat","hash":{},"data":data,"loc":{"start":{"line":36,"column":20},"end":{"line":36,"column":48}}}))
    + "\n                    "
    + alias3((lookupProperty(helpers,"customStat")||(depth0 && lookupProperty(depth0,"customStat"))||alias2).call(alias1,"Life per level",((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"life_rating") : stack1),1,10,{"name":"customStat","hash":{},"data":data,"loc":{"start":{"line":37,"column":20},"end":{"line":37,"column":73}}}))
    + "\n                    "
    + alias3((lookupProperty(helpers,"percentStat")||(depth0 && lookupProperty(depth0,"percentStat"))||alias2).call(alias1,"Experience penalty",(depth0 != null ? lookupProperty(depth0,"exp_penalty") : depth0),-1,0,{"name":"percentStat","hash":{},"data":data,"loc":{"start":{"line":38,"column":20},"end":{"line":38,"column":73}}}))
    + "\n                </dl>\n            </div>\n            <div class=\"col-md-4 stats extra-stats\">\n                <h4>Additional Stats</h4>\n                <dl class=\"dl-horizontal\">\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"size") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":20},"end":{"line":44,"column":63}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"global_speed_base") : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":20},"end":{"line":45,"column":114}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"poison_immune") : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":20},"end":{"line":46,"column":111}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"cut_immune") : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":20},"end":{"line":47,"column":104}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"silence_immune") : stack1),{"name":"if","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":20},"end":{"line":48,"column":114}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"stun_immune") : stack1),{"name":"if","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":20},"end":{"line":49,"column":105}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"fear_immune") : stack1),{"name":"if","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":20},"end":{"line":50,"column":105}}})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"no_breath") : stack1),{"name":"if","hash":{},"fn":container.program(28, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":20},"end":{"line":51,"column":92}}})) != null ? stack1 : "")
    + "\n                </dl>\n            </div>\n        </div>\n        <div class=\"class-detail-container container-fluid\">\n            "
    + alias3((lookupProperty(helpers,"$")||(depth0 && lookupProperty(depth0,"$"))||alias2).call(alias1,"class_talents",{"name":"$","hash":{"css_class":"race-talents","title":"Race Talents","talents_types":(depth0 != null ? lookupProperty(depth0,"race_talents") : depth0),"talents_types_sorted":(depth0 != null ? lookupProperty(depth0,"race_talents_sorted") : depth0)},"data":data,"loc":{"start":{"line":56,"column":12},"end":{"line":56,"column":148}}}))
    + "\n        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none;\"";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <img src=\"img/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"file") || (depth0 != null ? lookupProperty(depth0,"file") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"file","hash":{},"data":data,"loc":{"start":{"line":17,"column":34},"end":{"line":17,"column":42}}}) : helper)))
    + "\" width=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"width") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":17,"column":51},"end":{"line":17,"column":90}}})) != null ? stack1 : "")
    + "\" height=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"height") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":17,"column":100},"end":{"line":17,"column":141}}})) != null ? stack1 : "")
    + "\"/>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"width") || (depth0 != null ? lookupProperty(depth0,"width") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"width","hash":{},"data":data,"loc":{"start":{"line":17,"column":64},"end":{"line":17,"column":73}}}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    return "96";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"height") || (depth0 != null ? lookupProperty(depth0,"height") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"height","hash":{},"data":data,"loc":{"start":{"line":17,"column":114},"end":{"line":17,"column":124}}}) : helper)));
},"14":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"textStat")||(depth0 && lookupProperty(depth0,"textStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Size",(depth0 != null ? lookupProperty(depth0,"size") : depth0),{"name":"textStat","hash":{},"data":data,"loc":{"start":{"line":44,"column":32},"end":{"line":44,"column":56}}}));
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"percentStat")||(depth0 && lookupProperty(depth0,"percentStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Global speed",((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"global_speed_base") : stack1),0,1,{"name":"percentStat","hash":{},"data":data,"loc":{"start":{"line":45,"column":50},"end":{"line":45,"column":107}}}));
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"percentStat")||(depth0 && lookupProperty(depth0,"percentStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Poison resistance",((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"poison_immune") : stack1),0,0,{"name":"percentStat","hash":{},"data":data,"loc":{"start":{"line":46,"column":46},"end":{"line":46,"column":104}}}));
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"percentStat")||(depth0 && lookupProperty(depth0,"percentStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Bleed resistance",((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"cut_immune") : stack1),0,0,{"name":"percentStat","hash":{},"data":data,"loc":{"start":{"line":47,"column":43},"end":{"line":47,"column":97}}}));
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"percentStat")||(depth0 && lookupProperty(depth0,"percentStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Silence resistance",((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"silence_immune") : stack1),0,0,{"name":"percentStat","hash":{},"data":data,"loc":{"start":{"line":48,"column":47},"end":{"line":48,"column":107}}}));
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"percentStat")||(depth0 && lookupProperty(depth0,"percentStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Stun resistance",((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"stun_immune") : stack1),0,0,{"name":"percentStat","hash":{},"data":data,"loc":{"start":{"line":49,"column":44},"end":{"line":49,"column":98}}}));
},"26":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"percentStat")||(depth0 && lookupProperty(depth0,"percentStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Fear resistance",((stack1 = (depth0 != null ? lookupProperty(depth0,"copy") : depth0)) != null ? lookupProperty(stack1,"fear_immune") : stack1),0,0,{"name":"percentStat","hash":{},"data":data,"loc":{"start":{"line":50,"column":44},"end":{"line":50,"column":98}}}));
},"28":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression((lookupProperty(helpers,"textStat")||(depth0 && lookupProperty(depth0,"textStat"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Special","No need to breathe",{"name":"textStat","hash":{},"data":data,"loc":{"start":{"line":51,"column":42},"end":{"line":51,"column":85}}}));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h2>"
    + container.escapeExpression((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":4,"column":32}}}))
    + "</h2>\n<div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"single_subrace") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":9,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"subrace_list") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":58,"column":13}}})) != null ? stack1 : "")
    + "</div>\n";
},"usePartial":true,"useData":true,"useDepths":true});
templates['race_nav'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li><a href=\"#races/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":11,"column":28},"end":{"line":11,"column":51}}}))
    + alias3(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":11,"column":51},"end":{"line":11,"column":67}}}) : helper)))
    + "\"><span data-toggle=\"collapse\" data-target=\"#nav-"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":11,"column":116},"end":{"line":11,"column":139}}}))
    + "\" class=\"dropdown collapsed\"></span>"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":11,"column":175},"end":{"line":11,"column":203}}}))
    + "</a>\n            <ul class=\"nav collapse\" id=\"nav-"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":12,"column":45},"end":{"line":12,"column":68}}}))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"subrace_list") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":16},"end":{"line":15,"column":29}}})) != null ? stack1 : "")
    + "            </ul></li>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <li><a href=\"#races/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"short_name") : depths[1]),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":14,"column":40},"end":{"line":14,"column":66}}}))
    + "/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"short_name") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":14,"column":67},"end":{"line":14,"column":90}}}))
    + alias3(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":14,"column":90},"end":{"line":14,"column":106}}}) : helper)))
    + "\">"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"display_name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":14,"column":108},"end":{"line":14,"column":136}}}))
    + "</a></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul id=\"nav-races\" class=\"nav\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"race_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":17,"column":13}}})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true,"useDepths":true});
templates['search_suggestion'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\"#"
    + alias3((lookupProperty(helpers,"toUnsafeHtmlId")||(depth0 && lookupProperty(depth0,"toUnsafeHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"href") : depth0),{"name":"toUnsafeHtmlId","hash":{},"data":data,"loc":{"start":{"line":1,"column":10},"end":{"line":1,"column":33}}}))
    + alias3(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":49}}}) : helper)))
    + "\">\n"
    + alias3(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":8}}}) : helper)))
    + "<br>\n<p class=\"description\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":3,"column":23},"end":{"line":3,"column":31}}}) : helper)))
    + "</p>\n</a>\n";
},"useData":true});
templates['talent_by_type'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h2><a class=\"anchor\" id=\"talents/"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":3,"column":34},"end":{"line":3,"column":42}}}) : helper)))
    + "\"></a>"
    + alias4((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":3,"column":48},"end":{"line":3,"column":68}}}))
    + "</h2>\n<div>\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":22}}}) : helper)))
    + "</p>\n    <p id=\"talents/"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":6,"column":19},"end":{"line":6,"column":27}}}) : helper)))
    + "-avail\"></p>\n    <div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"talents") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":24,"column":21}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"panel panel-default\">\n                <div class=\"panel-heading clickable\">\n                    <h3 class=\"panel-title\">\n                        <a id=\"talents/"
    + alias1(container.lambda((depths[1] != null ? lookupProperty(depths[1],"type") : depths[1]), depth0))
    + "/"
    + alias1((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias3).call(alias2,(depth0 != null ? lookupProperty(depth0,"id") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":12,"column":51},"end":{"line":12,"column":66}}}))
    + "\" data-toggle=\"collapse\" data-target=\"#collapse-"
    + alias1((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias3).call(alias2,(depth0 != null ? lookupProperty(depth0,"id") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":12,"column":114},"end":{"line":12,"column":129}}}))
    + "\">\n                            "
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_img"),depth0,{"name":"talent_img","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + alias1(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias3),(typeof helper === "function" ? helper.call(alias2,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":13,"column":44},"end":{"line":13,"column":52}}}) : helper)))
    + "\n                        </a>\n                    </h3>\n                </div>\n                <div id=\"collapse-"
    + alias1((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias3).call(alias2,(depth0 != null ? lookupProperty(depth0,"id") : depth0),{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":17,"column":34},"end":{"line":17,"column":49}}}))
    + "\" class=\"talent-details panel-collapse collapse\">\n                    <div class=\"panel-body\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_details"),depth0,{"name":"talent_details","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"source_code") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":24},"end":{"line":20,"column":238}}})) != null ? stack1 : "")
    + "\n                        </div>\n                    </div>\n                </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"_dlc") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":43},"end":{"line":20,"column":231}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"source-link\"><a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"tome_git_url") || (depth0 != null ? lookupProperty(depth0,"tome_git_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tome_git_url","hash":{},"data":data,"loc":{"start":{"line":20,"column":93},"end":{"line":20,"column":109}}}) : helper)))
    + "/blob/"
    + alias4(((helper = (helper = lookupProperty(helpers,"tag") || (depth0 != null ? lookupProperty(depth0,"tag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tag","hash":{},"data":data,"loc":{"start":{"line":20,"column":115},"end":{"line":20,"column":122}}}) : helper)))
    + "/game/modules/tome/"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"source_code") : depth0)) != null ? lookupProperty(stack1,"0") : stack1), depth0))
    + "#L"
    + alias4(alias5(((stack1 = (depth0 != null ? lookupProperty(depth0,"source_code") : depth0)) != null ? lookupProperty(stack1,"1") : stack1), depth0))
    + "\" target=\"_blank\">View source</a></div>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":27,"column":9}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});
templates['talent_by_type_nav'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li><a href=\"#recent-changes/talents"
    + alias4(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":3,"column":44},"end":{"line":3,"column":60}}}) : helper)))
    + "\"><span class=\"no-dropdown\"></span>New in "
    + alias4(((helper = (helper = lookupProperty(helpers,"version") || (depth0 != null ? lookupProperty(depth0,"version") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data,"loc":{"start":{"line":3,"column":102},"end":{"line":3,"column":113}}}) : helper)))
    + "</a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li><a href=\"#changes/talents"
    + alias4(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":6,"column":37},"end":{"line":6,"column":53}}}) : helper)))
    + "\"><span class=\"no-dropdown\"></span>New in "
    + alias4(((helper = (helper = lookupProperty(helpers,"majorVersion") || (depth0 != null ? lookupProperty(depth0,"majorVersion") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"majorVersion","hash":{},"data":data,"loc":{"start":{"line":6,"column":95},"end":{"line":6,"column":111}}}) : helper)))
    + "</a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li><a href=\"#talents/"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,depth0,{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":9,"column":30},"end":{"line":9,"column":47}}}))
    + alias3(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":9,"column":47},"end":{"line":9,"column":63}}}) : helper)))
    + "\"><span data-toggle=\"collapse\" data-target=\"#nav-"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,depth0,{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":9,"column":112},"end":{"line":9,"column":129}}}))
    + "\" class=\"dropdown collapsed\"></span>"
    + alias3((lookupProperty(helpers,"toTitleCase")||(depth0 && lookupProperty(depth0,"toTitleCase"))||alias2).call(alias1,depth0,{"name":"toTitleCase","hash":{},"data":data,"loc":{"start":{"line":9,"column":165},"end":{"line":9,"column":185}}}))
    + "</a>\n            <ul class=\"nav collapse\" id=\"nav-"
    + alias3((lookupProperty(helpers,"toHtmlId")||(depth0 && lookupProperty(depth0,"toHtmlId"))||alias2).call(alias1,depth0,{"name":"toHtmlId","hash":{},"data":data,"loc":{"start":{"line":10,"column":45},"end":{"line":10,"column":62}}}))
    + "\">\n            </ul></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul id=\"nav-talents\" class=\"nav\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasMinorChanges") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":4,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasMajorChanges") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":7,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"talent_categories") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":13,"column":13}}})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});
templates['talent_modal'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <div class=\"talent-description\">\n                "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"info_text") || (depth0 != null ? lookupProperty(depth0,"info_text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"info_text","hash":{},"data":data,"loc":{"start":{"line":17,"column":16},"end":{"line":17,"column":31}}}) : helper))) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"no_unlearn_last") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":16},"end":{"line":20,"column":23}}})) != null ? stack1 : "")
    + "              </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                  <p class=\"stock-text\">This talent can alter the world in a permanent way, as such you can never unlearn it once known.</p>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <dt>Requirements</dt>\n                <dd>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"multi_require") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":29,"column":18},"end":{"line":39,"column":25}}})) != null ? stack1 : "")
    + "                </dd>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <span class=\"html-tooltip\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"\n                    Requirements at 1-"
    + alias2(((helper = (helper = lookupProperty(helpers,"points") || (depth0 != null ? lookupProperty(depth0,"points") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"points","hash":{},"data":data,"loc":{"start":{"line":31,"column":38},"end":{"line":31,"column":48}}}) : helper)))
    + " talent points:\n                    <ol>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"require") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":20},"end":{"line":35,"column":29}}})) != null ? stack1 : "")
    + "                    </ol>\">"
    + alias2(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"require") : depth0)) != null ? lookupProperty(stack1,"0") : stack1), depth0))
    + "</span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                      <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"require") : depth0)) != null ? lookupProperty(stack1,"0") : stack1), depth0)) != null ? stack1 : "")
    + "\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Use Mode</dt><dd>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"mode") || (depth0 != null ? lookupProperty(depth0,"mode") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mode","hash":{},"data":data,"loc":{"start":{"line":42,"column":47},"end":{"line":42,"column":55}}}) : helper)))
    + "</dd>";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Cost</dt><dd>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":43,"column":43},"end":{"line":43,"column":53}}}) : helper))) != null ? stack1 : "")
    + "</dd>";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Range</dt><dd>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"range") || (depth0 != null ? lookupProperty(depth0,"range") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"range","hash":{},"data":data,"loc":{"start":{"line":44,"column":45},"end":{"line":44,"column":56}}}) : helper))) != null ? stack1 : "")
    + "</dd>";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Cooldown</dt><dd>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"cooldown") || (depth0 != null ? lookupProperty(depth0,"cooldown") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cooldown","hash":{},"data":data,"loc":{"start":{"line":45,"column":51},"end":{"line":45,"column":65}}}) : helper))) != null ? stack1 : "")
    + "</dd>";
},"18":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>Use Speed</dt><dd>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"use_speed") || (depth0 != null ? lookupProperty(depth0,"use_speed") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"use_speed","hash":{},"data":data,"loc":{"start":{"line":46,"column":53},"end":{"line":46,"column":66}}}) : helper)))
    + "</dd>";
},"20":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<dt>DLC</dt><dd>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"_dlc_name") || (depth0 != null ? lookupProperty(depth0,"_dlc_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"_dlc_name","hash":{},"data":data,"loc":{"start":{"line":47,"column":42},"end":{"line":47,"column":55}}}) : helper)))
    + "</dd>";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <div class=\"talent-subtree-section\">\n            <h5>Individual Talents</h5>\n            <div class=\"talent-grid\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"talents") : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":14},"end":{"line":60,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n          </div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"individual-talent\" data-talent-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":56,"column":63},"end":{"line":56,"column":69}}}) : helper)))
    + "\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_img"),depth0,{"name":"talent_img","data":data,"indent":"                  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                  <div class=\"talent-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":58,"column":43},"end":{"line":58,"column":51}}}) : helper)))
    + "</div>\n                </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal fade\" id=\"talent-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"talent-modal-title\">\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n    <div class=\"modal-content talent-popup\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\" id=\"talent-modal-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":56},"end":{"line":9,"column":64}}}) : helper)))
    + "</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"talent-popup-layout\">\n          <div class=\"talent-image-section\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"talent_img"),depth0,{"name":"talent_img","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"info_text") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":22,"column":19}}})) != null ? stack1 : "")
    + "          </div>\n          <div class=\"talent-stats-section\">\n            <dl class='talent-stats-table'>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"require") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":14},"end":{"line":41,"column":21}}})) != null ? stack1 : "")
    + "              "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"mode") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":14},"end":{"line":42,"column":67}}})) != null ? stack1 : "")
    + "\n              "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"cost") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":14},"end":{"line":43,"column":65}}})) != null ? stack1 : "")
    + "\n              "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"range") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":14},"end":{"line":44,"column":68}}})) != null ? stack1 : "")
    + "\n              "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"cooldown") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":14},"end":{"line":45,"column":77}}})) != null ? stack1 : "")
    + "\n              "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"use_speed") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":14},"end":{"line":46,"column":78}}})) != null ? stack1 : "")
    + "\n              "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"_dlc") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":14},"end":{"line":47,"column":67}}})) != null ? stack1 : "")
    + "\n            </dl>\n          </div>\n        </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"talents") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":8},"end":{"line":63,"column":15}}})) != null ? stack1 : "")
    + "      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        <a href=\"#talents/"
    + alias4((lookupProperty(helpers,"toUnsafeHtmlId")||(depth0 && lookupProperty(depth0,"toUnsafeHtmlId"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),{"name":"toUnsafeHtmlId","hash":{},"data":data,"loc":{"start":{"line":67,"column":26},"end":{"line":67,"column":49}}}))
    + alias4(((helper = (helper = lookupProperty(helpers,"currentQuery") || (depth0 != null ? lookupProperty(depth0,"currentQuery") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currentQuery","hash":{},"data":data,"loc":{"start":{"line":67,"column":49},"end":{"line":67,"column":65}}}) : helper)))
    + "\" class=\"btn btn-primary\">View Full Talent Tree</a>\n      </div>\n    </div>\n  </div>\n</div>";
},"usePartial":true,"useData":true});
})();