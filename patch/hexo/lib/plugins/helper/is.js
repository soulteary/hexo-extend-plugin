'use strict';

function isHomePageHelper() {
    return Boolean(this.page.__index && this.page.path === 'index.html');
}

function isArchiveHelper() {
    return Boolean(this.page.archive);
}

function isYearsArchiveHelper() {
    return Boolean(this.page.archive && this.page.base.match(/\/\d{4}\/$/));
}

function is404Helper() {
    return Boolean(this.page.path.match(/^404(\/)?(index.html)?$/));
}

function isSearchHelper() {
    return Boolean(this.page.path.match(/^s(earch)?(\/)?(index.html)?$/));
}

function isRedirectHelper() {
    return Boolean(this.page.path.match(/^redirect(\/)?(index.html)?$/));
}

function isDocumentHelper(isRoot) {
    let regexp = new RegExp('^' + (this.config.document_dir || '(document|doc)') + '(\/)?(.+\.html)?$');
    if (isRoot) {
        return Boolean(this.page.path.match(regexp)) && (this.page.path === this.config.document_dir + '/index.html');
    } else {
        return Boolean(this.page.path.match(regexp));
    }
}

function isComponentsHelper(isRoot) {
    let regexp = new RegExp('^' + (this.config.components_dir || '(components)') + '(\/(\S+.html?))?');
    let regexpComponentsDirs = new RegExp('^' + (this.config.components_dir || '(components)') + '\/.*');
    if (isRoot) {
        return Boolean(this.page.path.match(regexp) || this.page.path.match(regexpComponentsDirs)) &&
            this.page.path === this.config.components_dir + '/index.html';
    } else {
        return Boolean(this.page.path.match(regexp) || this.page.path.match(regexpComponentsDirs));
    }
}

function isIntroHelper(isRoot) {
    let regexp = new RegExp('^' + (this.config.intro_dir || '(intro|about)') + '(\/(\S+.html?))?');
    if (isRoot) {
        return Boolean(this.page.path.match(regexp)) &&
            this.page.path === this.config.intro_dir + '/index.html';
    } else {
        return Boolean(this.page.path.match(regexp));
    }
}

function isDownloadHelper() {
    let regexp = new RegExp('^' + (this.config.download_dir || '(download)') + '(\/(\S+.html?))?');
    return Boolean(this.page.path.match(regexp));
}


exports.homepage = isHomePageHelper;

exports.archiveIndex = isArchiveHelper;

exports.yearsArchive = isYearsArchiveHelper;

exports.is404 = is404Helper;

exports.search = isSearchHelper;

exports.redirect = isRedirectHelper;

exports.document = isDocumentHelper;

exports.components = isComponentsHelper;

exports.intro = isIntroHelper;

exports.download = isDownloadHelper;