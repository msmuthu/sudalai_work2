import { counter_increment, counter_decrement } from './constants';
import createPortalAPI, {
  kb,
  community,
  tickets,
} from '@zohodesk/portal-api-creator';
import { normalizer, schema, arrayOf } from 'simple-normalizr';

// const test = schema('user', {
//   mapping: {
//     commenter: schema('comment'),
//   }
// });

const attachmentSchema = schema('attachments');

const attachmentsNormalizer = normalizer(arrayOf(attachmentSchema));

console.log(
  attachmentsNormalizer([
    {
      id: '22926000007224047',
      name: 'Screen Shot 2022-04-20 at 12.52.22 PM.png',
      size: '709231',
    },
  ])
);

const commentSchema = schema('comments');
const threadSchema = schema('threads');
const conversationsSchema = arrayOf(
  schema({
    union: {
      thread: threadSchema,
      comment: commentSchema,
    },
    key: 'type',
  })
);

const testnormalize = normalizer(arrayOf(conversationsSchema));

console.log(
  testnormalize([
    {
      modifiedTime: '2022-05-30T09:44:46.000Z',
      attachments: [],
      commentedTime: '2022-05-30T09:44:46.000Z',
      id: '22926000007037013',
      type: 'comment',
      contentType: 'html',
      content:
        '<div style="font-size: 13px; font-family: Arial, Helvetica, sans-serif"><div>sdcsc</div></div>',
      commenterId: '22926000000108001',
      commenter: {
        photoURL:
          'https://desk.localzoho.com/portal/api/user/22926000000108001/photo',
        name: 'chinthikanum makkale',
      },
      direction: 'in',
    },
    {
      hasAttach: false,
      summary: 'sdcjhbsduycbdshc877',
      isDraft: false,
      channel: 'WEB',
      responder: {
        photoURL: null,
        name: 'jessinth.lawrence',
      },
      createdTime: '2022-05-30T07:44:59.241Z',
      responsderId: null,
      id: '22926000007031291',
      type: 'thread',
      direction: 'out',
    },
  ])
);
/* call only ThunkMiddleware using */
// function incrementDispatch() {
//   return (dispatch, getState) => {
//     console.log(dispatch, getState(), '1234567890');
//     dispatch({
//       type: counter_increment,
//     });
//   };
// }

let createApi = createPortalAPI(
  { kb, community, tickets },
  () => 'https://desk.localzoho.com/portal/api/',
  (module) => {
    return {
      portalId:
        'edbsnc24d7592722406cbc24631dc23e0ba23080dad13f518e20bcc5e6135c66b3362',
    };
  }
);

function incrementDispatch() {
  const rootCategorySchema = schema('categories');
  const rootCategoriesNormalizer = normalizer(arrayOf(rootCategorySchema));
  // console.log(
  //   rootCategorySchema,
  //   'rootCategorySchema',
  //   rootCategoriesNormalizer([
  //     { name: 'sudalai', age: '24' },
  //     { name: 'Arun', age: '22' },
  //     { name: 'Sankar', age: '21' },
  //     { name: 'Psycho', age: '20' },
  //   ]),
  //   'rootCategoriesNormalizer',
  //   'rootCategorySchema'
  // );
  // console.log(
  //   createApi.ticket.get(
  //     { ticketId: '22926000006959350',featureFlags:'' },
  //     (res) => {
  //       console.log(res, 'relatedTopicSearch');
  //       return res;
  //     },
  //     (err) => {
  //       console.log(err, 'error00009090900');
  //       return err;
  //     }
  //   ),
  //   'scddsc'
  // );

  createApi.community.communityTopics.relatedTopicSearch(
    {
      limit: 3,
      communityId: '29262000007223003',
      from: 1,
    },
    (res) => {
      console.log(res, 'relatedTopicSearch');
      return res;
    },
    (err) => {
      console.log(err, 'error');
      return err;
    }
  );
  createApi.kb.kbCategory.rootCategories(
    {
      limit: 3,
    },
    (res) => {
      //console.log(res, rootCategoriesNormalizer(res), 'rootCategories');
      return res;
    },
    (err) => {
      //console.log(err, 'error');
      return err;
    }
  );
  return { type: counter_increment, data: 'data_increment' };
}

function decrementDispatch() {
  return { type: counter_decrement };
}

export { incrementDispatch, decrementDispatch };
