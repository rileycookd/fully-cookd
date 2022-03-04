import React, { Fragment } from 'react';
import QueryContainer from 'part:@sanity/base/query-container';
import Spinner from 'part:@sanity/components/loading/spinner';
import Preview from 'part:@sanity/base/preview';
import schema from 'part:@sanity/base/schema';

const RelatedRegistrations = ({ document }) => (
  <QueryContainer
    query={`*[references($id) && _type == "registration"]`} 
    params={{ id: document.displayed._id.replace('drafts.', '') }}
  >
    {({ result, loading }) =>
      loading ? (
        <Spinner center message="Loading items…" />
      ) : (
        result && (
          <ul>
            {result.documents.map(document => (
              <Fragment key={document._id}>
                  {/* // Stringifying a JSON representation of the displayed data */}
                <pre>{JSON.stringify(document, null, 2)}</pre>
              </Fragment>
            ))}
          </ul>
        )
      )
    }
  </QueryContainer>
);

export default RelatedRegistrations