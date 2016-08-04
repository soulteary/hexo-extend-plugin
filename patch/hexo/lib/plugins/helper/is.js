'use strict';

function isHomePageHelper () {
    return Boolean(this.page.__index && this.page.path === 'index.html');
}

function isArchiveHelper () {
    return Boolean(this.page.archive);
}

function isYearsArchiveHelper () {
    return Boolean(this.page.archive && this.page.base.match(/\/\d{4}\/$/));
}


function is404Helper () {
    return Boolean(this.page.path.match(/^404(\/)?(index.html)?$/));
}

function isSearchHelper () {
    return Boolean(this.page.path.match(/^s(earch)?(\/)?(index.html)?$/));
}

function isRedirectHelper () {
    return Boolean(this.page.path.match(/^redirect(\/)?(index.html)?$/));
}

function isComponentsHelper () {
    return Boolean(this.page.path.match(/^components(\/(\S+.html?))?/) || this.page.path.match(/^components\/.*/));
}


exports.homepage = isHomePageHelper;

exports.archiveIndex = isArchiveHelper;

exports.yearsArchive = isYearsArchiveHelper;

exports.is404 = is404Helper;

exports.search = isSearchHelper;

exports.redirect = isRedirectHelper;

exports.components = isComponentsHelper;