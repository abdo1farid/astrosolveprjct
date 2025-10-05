/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

import PropTypes from "prop-types"

const ObjectivesCard = ({
    icon,
    label,
    desc,
    classes,
}) => {
    return (
    <div className={'flex items-center gap-3 ring-2 ring-inset ring-slate-50/10 rounded-2xl p-3 hover:bg-slate-800 transition-colors group ' + classes}>
            <figure>
                <span className="mr-1 material-symbols-rounded" aria-hidden="true">
                    {icon}
                </span>
            </figure>

            <div>
                <h3>{label}</h3>
                <p className="text-sky-300 text-sm"> {desc} </p>
            </div>
        </div>
    )
}

ObjectivesCard.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    classes: PropTypes.string
}

export default ObjectivesCard
