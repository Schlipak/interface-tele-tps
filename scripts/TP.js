"use strict";function TP(newMetaData){this.meta=newMetaData,this.resources=[]}function removeFromArray(arr,from,to){var rest=arr.slice((to||from)+1||arr.length);return arr.length=0>from?arr.length+from:from,arr.push.apply(arr,rest)}TP.prototype.getMeta=function(){return this.meta},TP.prototype.getName=function(){return this.meta.experiment.name},TP.prototype.getNodes=function(){return this.resources},TP.prototype.deleteResource=function(res){for(var i=0;i<this.resources.length;i++)this.resources[i].deleteInterfaceByEndpoint(this.getEndpoint(res));removeFromArray(this.resources,res.index)},TP.prototype.resetFixed=function(){for(var i=0;i<this.resources.length;i++)void 0!==this.resources[i].fixed&&delete this.resources[i].fixed},TP.prototype.getLinks=function(){for(var links=[],i=0;i<this.resources.length;i++){var l=this.resources[i].getConnectedNodes();l.length>0&&(links=links.concat(l))}return links},TP.prototype.getEndpoint=function(endpoint){for(var i=0;i<this.resources.length;i++)if(this.resources[i].equals(endpoint))return this.resources[i]},TP.prototype.getResourceSize=function(){return this.resources.length},TP.prototype.addResource=function(res){this.resources.push(res)},TP.prototype.toJson=function(){var d=angular.copy(this.meta);d.descriptor="MesTeleTps_LearningExperimentDescription",d.version="1.0",d.experiment.starting_date=moment(d.experiment.starting_date).format("YYYYMMDDHHmm"),d.experiment.ending_date=moment(d.experiment.ending_date).format("YYYYMMDDHHmm"),d.resources=angular.copy(this.resources);for(var res in d.resources){var r=d.resources[res];delete r.x,delete r.y,delete r.px,delete r.py,delete r.index,delete r.weight,delete r.fixed,delete r.networkObjectIndex,"switch"===r.type&&delete r["function"],"terminal"!==r["function"]&&delete r.extra_modules;for(var i=0;i<r.network_interfaces.length;i++){var endpoint=r.network_interfaces[i].endpoint;delete r.network_interfaces[i].endpoint,r.network_interfaces[i].endpoint=endpoint.getId()}}return JSON.stringify(d,null,2)};