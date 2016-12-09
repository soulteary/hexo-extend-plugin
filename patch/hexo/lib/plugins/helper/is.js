'use strict';

function isCurrentHelper(path, strict) {
    path = path || '';

    if (strict) {
        if (path[path.length - 1] === '/') path += 'index.html';

        return this.path === path;
    }

    path = path.replace(/\/index\.html$/, '/');

    return this.path.substring(0, path.length) === path;
}

function isHomeHelper() {
    return Boolean(this.page.__index);
}

function isPostHelper() {
    return Boolean(this.page.__post);
}

function isPageHelper() {
    return Boolean(this.page.__page);
}

function isArchiveHelper() {
    return Boolean(this.page.archive);
}

function isYearHelper(year) {
    var page = this.page;
    if (!page.archive) return false;

    if (year) {
        return page.year === year;
    }

    return Boolean(page.year);
}

function isMonthHelper(year, month) {
    var page = this.page;
    if (!page.archive) return false;

    if (year) {
        if (month) {
            return page.year === year && page.month === month;
        }

        return page.month === year;
    }

    return Boolean(page.year && page.month);
}

function isCategoryHelper(category) {
    if (category) {
        return this.page.category === category;
    }

    return Boolean(this.page.category);
}

function isTagHelper(tag) {
    if (tag) {
        return this.page.tag === tag;
    }

    return Boolean(this.page.tag);
}

exports.current = isCurrentHelper;
exports.home = isHomeHelper;
exports.post = isPostHelper;
exports.page = isPageHelper;
exports.archive = isArchiveHelper;
exports.year = isYearHelper;
exports.month = isMonthHelper;
exports.category = isCategoryHelper;
exports.tag = isTagHelper;

function isHomePageHelper() {
    return Boolean(this.page.__index && this.page.path === 'index.html');
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

function isRedirectHelper() {
    return Boolean(this.page.path.match(/^redirect(\/)?(index.html)?$/));
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

exports.homepage = isHomePageHelper;
exports.intro = isIntroHelper;
exports.download = isDownloadHelper;
exports.document = isDocumentHelper;
exports.components = isComponentsHelper;
exports.redirect = isRedirectHelper;
exports.yearsArchive = isYearsArchiveHelper;
exports.is404 = is404Helper;
exports.search = isSearchHelper;
