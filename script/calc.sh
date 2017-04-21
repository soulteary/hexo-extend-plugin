#!/usr/bin/env bash

TARGET_DIR=$1;

if [ -z $TARGET_DIR ]; then
    echo "USEAGE: ./calc.sh HEXO_WEBSITE_DIR";
    exit 1;
fi

if [ ! -d ${TARGET_DIR} ]; then
    if [ ! -d "${TARGET_DIR}/node_modules" ]; then
        echo "PLEASE RUN NPM INSTALL FIRST.";
        exit 2;
    fi
fi

BASE_DIR="${TARGET_DIR}/node_modules/";

# 1
HEXO_LIB_HELPER_ENTRYPOINT="hexo/lib/plugins/helper/index.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_HELPER_ENTRYPOINT}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_HELPER_ENTRYPOINT}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_HELPER_ENTRYPOINT}";
md5 -q "${ABS_PATH}";
echo "";

# 2
HEXO_LIB_PLUGIN_GENERATOR_PAGE="hexo/lib/plugins/generator/page.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_PLUGIN_GENERATOR_PAGE}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_PLUGIN_GENERATOR_PAGE}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_PLUGIN_GENERATOR_PAGE}";
md5 -q "${ABS_PATH}";
echo "";

# 3
HEXO_LIB_PLUGIN_GENERATOR_POST="hexo/lib/plugins/generator/post.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_PLUGIN_GENERATOR_POST}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_PLUGIN_GENERATOR_POST}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_PLUGIN_GENERATOR_POST}";
md5 -q "${ABS_PATH}";
echo "";

# 4
HEXO_LIB_PLUGIN_CONSOLE_INDEX="hexo/lib/plugins/console/index.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_PLUGIN_CONSOLE_INDEX}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_PLUGIN_CONSOLE_INDEX}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_PLUGIN_CONSOLE_INDEX}";
md5 -q "${ABS_PATH}";
echo "";

# 5
HEXO_UTIL_LIB_PERMALINK="hexo-util/lib/permalink.js";
ABS_PATH="${BASE_DIR}${HEXO_UTIL_LIB_PERMALINK}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_UTIL_LIB_PERMALINK}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_UTIL_LIB_PERMALINK}";
md5 -q "${ABS_PATH}";
echo "";

# 6
HEXO_LIB_FILTER_AFTER_POST_RENDER="hexo/lib/plugins/filter/after_post_render/index.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_FILTER_AFTER_POST_RENDER}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_FILTER_AFTER_POST_RENDER}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_FILTER_AFTER_POST_RENDER}";
md5 -q "${ABS_PATH}";
echo "";

# 7
HEXO_LIB_FILTER_AFTER_POST_EXCERPT="hexo/lib/plugins/filter/after_post_render/excerpt.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_FILTER_AFTER_POST_EXCERPT}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_FILTER_AFTER_POST_EXCERPT}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_FILTER_AFTER_POST_EXCERPT}";
md5 -q "${ABS_PATH}";
echo "";

# 8
HEXO_GENERATOR_ARCHIVE_LIB_INDEX="hexo-generator-archive/index.js";
ABS_PATH="${BASE_DIR}${HEXO_GENERATOR_ARCHIVE_LIB_INDEX}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_GENERATOR_ARCHIVE_LIB_INDEX}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_GENERATOR_ARCHIVE_LIB_INDEX}";
md5 -q "${ABS_PATH}";
echo "";

# 9
HEXO_GENERATOR_INDEX_LIB_INDEX="hexo-generator-index/index.js";
ABS_PATH="${BASE_DIR}${HEXO_GENERATOR_INDEX_LIB_INDEX}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_GENERATOR_INDEX_LIB_INDEX}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_GENERATOR_INDEX_LIB_INDEX}";
md5 -q "${ABS_PATH}";
echo "";

# 10
HEXO_PAGINATION_LIB="hexo-pagination/lib/pagination.js";
ABS_PATH="${BASE_DIR}${HEXO_PAGINATION_LIB}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_PAGINATION_LIB}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_PAGINATION_LIB}";
md5 -q "${ABS_PATH}";
echo "";




