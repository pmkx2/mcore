// Generated by CoffeeScript 1.9.3

/**
 * 过滤函数
 * @module cnode/formatters
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/formatters', ['mcore', 'moment', 'markdown-it', 'highlight'], function(mcore, moment, Markdownit) {
    "use strict";
    var Template, highlight, markdown;
    hljs.initHighlightingOnLoad();
    Template = mcore.Template;
    highlight = (function() {
      var alias;
      alias = [
        {
          js: 'javascript',
          jscript: 'javascript',
          html: 'xml',
          htm: 'xml',
          coffee: 'coffeescript',
          'coffee-script': 'coffeescript',
          yml: 'yaml',
          pl: 'perl',
          ru: 'ruby',
          rb: 'ruby',
          csharp: 'cs'
        }
      ];
      return function(str, lang) {
        var _, compiled, content, firstLine, lines, numbers, result;
        lang = String(lang).toLowerCase() || 'plain';
        if (alias[lang]) {
          lang = alias[lang];
        }
        if (hljs.getLanguage(lang)) {
          try {
            compiled = hljs.highlight(lang, str).value;
          } catch (_error) {
            _ = _error;
            compiled = hljs.highlightAuto(str).value;
          }
        } else {
          compiled = hljs.highlightAuto(str).value;
        }
        lines = compiled.split('\n');
        numbers = '';
        content = '';
        firstLine = 1;
        if (!lines[lines.length - 1]) {
          lines.pop();
        }
        lines.forEach(function(item, i) {
          numbers += '<div class="line">' + (i + firstLine) + '</div>';
          return content += '<div class="line">' + item + '</div>';
        });
        result = '<figure class="highlight' + (lang != null ? lang : ' ' + {
          lang: ''
        }) + '">';
        result += "<table>\n    <tr>\n        <td class=\"gutter\"><pre>" + numbers + "</pre></td>\n        <td class=\"code\"><pre>" + content + "</pre></td>\n    </tr>\n</table>";
        result += '</figure>';
        return result;
      };
    })();
    markdown = new Markdownit({
      html: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: 'hljs ',
      linkify: true,
      typographer: false,
      highlight: highlight
    });
    Template.formatters('dateFormat', function(value, format) {
      if (format == null) {
        format = 'YYYY-MM-DD';
      }
      return moment(value).format(format);
    });
    Template.formatters('fromNow', function(value) {
      return moment(value).fromNow();
    });
    return Template.formatters('markdown', function(value) {
      return markdown.render(value);
    });
  });

}).call(this);
