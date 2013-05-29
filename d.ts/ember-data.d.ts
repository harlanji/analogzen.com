/// <reference path="ember.d.ts" />

declare module DS {


    export function attr(t: string, options?:any):Ember.ComputedProperty;
    export function hasMany(t: string, options?:any):Ember.ComputedProperty;
    export function belongsTo(t: string, options?:any):Ember.ComputedProperty;

    export class Adapter extends Ember.Object {
        static create(...arguments: any[]);
        static extend(...arguments: any[]);
    }

    export class Store extends Ember.Object {
        static create(...arguments: any[]);
        static extend(...arguments: any[]);

    	registerAdapter(t:string, adapter:Adapter);
    }

    export class Model extends Ember.Object {
        static create(...arguments: any[]);
        static extend(...arguments: any[]);
    }
}