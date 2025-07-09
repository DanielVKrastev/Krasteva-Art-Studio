import PropTypes from "prop-types";

export default function LegalFooterNote({ version = "1.1", date }) {
  return (
    <div className="text-sm text-gray-500 text-right mt-8">
      Версия&nbsp;{version}
      {date && <> | Последна актуализация: {date}</>}
    </div>
  );
}

LegalFooterNote.propTypes = {
  version: PropTypes.string,
  date:    PropTypes.string,
};
